// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap, Sine} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Brother from "./Brother";
import store, { ACTION_SET_SECTIONS } from "./store";

gsap.registerPlugin(ScrollTrigger);

class AppMain {

    constructor(url) {
        console.log('construct', url);

        fetch(`${url}?t=${new Date().getTime()}`)
            .then(resp=> resp.json())
            .then(this.init)
            .then(this.intro)
            .catch(err => {
                console.log(err);
            });
    }
        
    init(data) {
        console.log(this, data, document.getElementById('ShareMe'));
        const sheet = data.sheets.global[0];

        render(<SocialBar 
            url={data.sheets.global[0].shareUrl}
            title={data.sheets.global[0].shareTitle}
        />, document.getElementById('ShareMe'));

        $$('[data-dyn]').forEach((el) => {
            // console.log(el)
            if (el instanceof Image) {
                el.src = `<%= path %>/${sheet[el.dataset.dyn]}`;
            } else {
                el.innerHTML = sheet[el.dataset.dyn];
            }
        });

        $('.client a').href = sheet.logoLink;
        
        render(<RelatedContent cards={data.sheets.related} />, $('.related'));

        store.dispatch({type: ACTION_SET_SECTIONS, payload: data.sheets.sections});
        
        render( <Brother />, document.getElementById('root'));
    }

    intro() {
        gsap.to('#Glabs', {duration: 2, autoAlpha: 1, delay: 1});

        // gsap.from('header .bg',{ backgroundPositionX: '-50', duration: 100, ease:'lenear.inOut'})
    }
    

}

window.addEventListener('load', e => {
    // https://docs.google.com/spreadsheets/d/1_ewZazGdgFXGWU_zNQk-0pNMBLF5_gGUWq8s6gJhXA0/edit?usp=sharing
    const app = new AppMain('https://interactive.guim.co.uk/docsdata/1_ewZazGdgFXGWU_zNQk-0pNMBLF5_gGUWq8s6gJhXA0.json');

});

