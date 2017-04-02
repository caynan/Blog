hexo.extend.filter.register('after_init', function () {
  // Remove json / js files being inserted to db.json -> Pages

  var listSync = hexo.extend.renderer.list(true),
      listAsync = hexo.extend.renderer.list();

  delete listSync.json;
  delete listAsync.json;
  delete listSync.js;
  delete listAsync.js;
});
