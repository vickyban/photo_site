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

    return this.getPhotos(jsonObj.data)
  }

  getPhotos(data) {
    return data.map(item => ({
      id: item.id,
      title: item.title,
      desc: item.description,
      link: item.link,
      ups: item.ups,
      downs: item.downs,
      datetime: item.datetime,
    }))
  }

}

export default Imgur;