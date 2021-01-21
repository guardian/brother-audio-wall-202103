// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";





class AppMain {

    constructor(url) {
        console.log('construct', url);

        fetch(`${url}?t=${new Date().getTime()}`)
            .then(resp=> resp.json())
            .then(this.init)
            .catch(err => {
                console.log(err);
            });
    }
        
    init(data) {
        console.log(data, document.getElementById('ShareMe'));
        const sheet = data.sheets.global[0];

        render(<SocialBar 
            url={data.sheets.global[0].shareUrl}
            title={data.sheets.global[0].shareTitle}
        />, document.getElementById('ShareMe'));

        $$('[data-dyn]').forEach((el) => {
            // console.log(el)
            el.innerHTML = sheet[el.dataset.dyn];
        });

        // $('body').addEventListener('click', e => {
        //     console.log(e);
        // });

        render(<RelatedContent cards={data.sheets.related} />, $('.related'));

        $$('.grid a, .related a').forEach(link => {
            link.setAttribute('target', '_blank');
        });
    }

}

const app = new AppMain('https://interactive.guim.co.uk/docsdata/1YJuvtQuxlx7_gqAnBvicOIfs6JmU7ctfSvKMrgar7Wg.json');
