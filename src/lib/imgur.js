import { CLIENT_ID } from 'lib/config_keys.js';

class Imgur {
  // section - hot, top, user
  // sort - viral, top, time, rising(for user section)
  // page - integer

  // hot+viral = popular
  //hot+time = newest
  async  fetchMainGallery(section = "hot", sort = "viral", page = 0) {
    const uri = `https://api.imgur.com/3/gallery/${section}/${sort}/${page}.json`;

    let header = new Headers();
    header.append("Authorization", `Client-ID ${CLIENT_ID}`);
    let request = new Request(uri, { meathod: "GET", headers: header })

    let jsonObj = await fetch(request).then(res => res.json())

    let formattedAlbums = jsonObj.data.map(data => this.formatAlbum(data))
    return formattedAlbums;
  }

  formatAlbum(data) {
    let formattedAlbum = {
      id: data.id,
      title: data.title,
      author: data.account_url,
      commentCount: data.comment_count,
      ups: data.ups,
      downs: data.downs,
      datetime: data.datetime,
    }
    if (data.is_album) {
      formattedAlbum.images = data.images.map(image => this.formatImage(image))
    } else {
      formattedAlbum.images = [this.formatImage(data)]
    }
    return formattedAlbum
  }

  formatImage(image) {
    return {
      id: image.id,
      desc: image.description,
      type: image.type,
      link: image.link,
      height: image.height,
      width: image.width
    }
  }

  async fetchImageComment(post_id, sort = 'best') {
    const uri = `https://api.imgur.com/3/gallery/${post_id}/comments/${sort}`;
    let header = new Headers();
    header.append("Authorization", `Client-ID ${CLIENT_ID}`);
    let request = new Request(uri, { meathod: "GET", headers: header });

    let jsonObj = await fetch(request).then(res => res.json());

    let formattedComments = jsonObj.data.map(rawComment => this.formatComment(rawComment))
    return formattedComments;
  }

  formatComment(cmt) {
    let formattedComment = {
      id: cmt.id,
      comment: cmt.comment,
      author: cmt.author,
      ups: cmt.up,
      downs: cmt.downs,
      datetime: cmt.datetime,
      children: []
    };
    if (cmt.children.length === 0)
      return formattedComment;
    else {
      let children = cmt.children.map(child => this.formatComment(child))
      formattedComment.chidren = children;
      return formattedComment
    }
  }

}

export default Imgur;