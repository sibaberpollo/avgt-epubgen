const axios = require('axios');
const epub = require('epub-gen');

var fecha = new Date();
var options = { year: 'numeric', month: 'long', day: 'numeric' };
let ahora = fecha.toLocaleDateString("es-ES", options)
axios.get('https://transtextos.springrolls.site/wp-json/wp/v2/avgt?filter[orderby]=date&order=asc').
  then(res => res.data).
  then(text => {
    //text = text.slice(text.indexOf('EXTRACTS.'));
    //text = text.slice(text.indexOf('CHAPTER 1.'));

    //const lines = text.split('\r\n');
    const content = [];
    for (let i = 0; i < text.length; ++i) {
        console.log(text[i].title);

        let capitulo = text[i].content.rendered.replace(/<a.*href.*>.*<\/a>/g, '');
      //capitulo = text[i].content.rendered.replace(/<[^>]+>/g, '');
        content.push({
            title: text[i].title.rendered,
            data: capitulo
        });
    }
    content.push({
        title: 'Notas temporales',
        data: '<p>Estimado lector, si has llegado hasta acá y no encuentras un final, es porque esta historia se publica cada dos semanas en https://transtextos.springrolls.site/</p><p>También puedes seguir el curso de la trama a través de mi cuenta de twitter: @mponsigue</p><p>¡Gracias!<br><br>'+ahora+'</p>'
    });
    const options = {
      title: 'Actos violentos de gente tranquila',
      author: 'Maximiliano Ponsigué',
      publisher: 'Transtextos',
      output: './avgt.epub',
      tocTitle: 'Índice',
      cover: "./avgt-cover.jpg",
      content
    };
    //console.log(content);
    return new epub(options).promise;
  }).
  then(() => console.log('Done')); 

  
