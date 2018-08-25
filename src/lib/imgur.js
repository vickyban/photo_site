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

    return this.formatPhotos(jsonObj.data)
  }

  formatPhotos(rawPhotos) {
    return rawPhotos.map(item => ({
      id: item.id,
      title: item.title,
      desc: item.description,
      link: item.link,
      ups: item.ups,
      downs: item.downs,
      datetime: item.datetime,
    }))
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
      chidren: []
    };
    if (cmt.chidren.length == 0)
      return formattedComment;
    else {
      let children = cmt.chidren.map(child => this.formatComment(child))
      formattedComment.chidren = children;
      return formattedComment
    }
  }

}

export default Imgur;