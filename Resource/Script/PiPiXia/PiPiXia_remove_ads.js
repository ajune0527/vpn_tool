/*
脚本引用https://gist.githubusercontent.com/ddgksf2013/bb1dadbd32f67c68772caebcc70b0a33/raw/pipixia.adblock.js
*/
var body = $response.body.replace(/id\":([0-9]{15,})/g, 'id":"$1str"'),
  obj = null;
try {
  obj =
    (body = JSON.parse(body)).data?.data ||
    body.data?.replies ||
    body.data?.cell_comments;
} catch (o) {
  console.log("JSON parse error:", o);
}
Array.isArray(obj)
  ? obj.forEach(function (o, i) {
      if (null != o.ad_info) {
        obj.splice(i, 1);
        return;
      }
      o.item?.video &&
        (o.item.video.video_download.url_list =
          o.item.origin_video_download.url_list),
        o.item?.comments &&
          o.item.comments.forEach(function (o) {
            o.video && (o.video_download.url_list = o.video.url_list);
          }),
        o.comment_info?.video &&
          (o.comment_info.video_download.url_list =
            o.comment_info.video.url_list);
    })
  : (obj.item?.video &&
      (obj.item.video.video_download.url_list =
        obj.item.origin_video_download.url_list),
    obj.item?.comments &&
      obj.item.comments.forEach(function (o) {
        o.video && (o.video_download.url_list = o.video.url_list);
      }),
    obj.comment_info?.video &&
      (obj.comment_info.video_download.url_list =
        obj.comment_info.video.url_list)),
  $done({
    body: (body = (body = (body = (body = (body = JSON.stringify(body)).replace(
      /id\":\"([0-9]{15,})str\"/g,
      'id":$1'
    )).replace(/\"can_download\":false/g, '"can_download":true')).replace(
      /tplv-ppx-logo.image/g,
      "0x0.gif"
    )).replace(/tplv-ppx-logo/g, "0x0")),
  });