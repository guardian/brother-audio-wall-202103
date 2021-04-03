import gsap from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";
import {h, Component} from "preact";
import { useEffect, useRef } from "preact/hooks";
import AudioPlayer from "../../../../shared/js/AudioPlayer";


const Image = ({panel, animation, startPos, endPos, index}) => {
    const ref = useRef();
    // const endPos = '80%';
    const anim = JSON.parse(animation)[index];

    useEffect(()=>{
        ref.current.addEventListener('load', () => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: 'top 100%',
                end: `80% ${endPos}`,
                scrub: 1.2,
                animation: gsap.from(ref.current,Object.assign({ease:'sine.in'}, anim))
                // markers: true
            })   
        });
    },[]);
    return (
        <img ref={ref} width="515" height="615" alt="" src={`<%= path %>/${panel}-${index+1}.png`} />
    )
}

const Collage = (props) => {

    return (
        <div className="collage">
            <img  width="515" height="615" alt="" src="<%= path %>/spacer.png"/>
            {new Array(parseInt(props.images,10)).fill(null).map((v,i)=> <Image {...props} key={i} index={i}></Image>)}
        </div>
    )

}

const innerHTML = (html) => {
    return {__html: html};
}

const Section = (props) => {

    const panelRef = useRef();
    const contentRef = useRef();
    const sectionRef = useRef();

    useEffect(()=>{
        // set background color
        sectionRef.current.style.setProperty('--panelBgColor', props.bgColor);

        // Pin
        ScrollTrigger.matchMedia({
            "(min-width: 980px)": function() {
                const st = ScrollTrigger.create({
                    trigger: panelRef.current,
                    start: 'top 0%',
                    end: 'bottom 100%',
                    scrub: 2.2,
                    // markers: true,
                    pin: true,
                    invalidateOnRefresh: true
    
                });

                return () => {
                    st.kill();
                }
            }
        });

        // Heading animation
        const h2 = contentRef.current.getElementsByTagName('h2');
        ScrollTrigger.create({
            trigger: h2,
            start: 'top 90%',
            end: 'bottom 100%',

            scrub: 2.2,
            animation: gsap.from(h2, {x: "30", alpha:0, ease: 'sine.in'}),
        });

        // Paragraph animation
        contentRef.current.getElementsByTagName('p').forEach((v)=>{

            ScrollTrigger.create({
                trigger: v,
                start: 'top 90%',
                end: 'bottom 100%',
    
                scrub: 2.2,
                animation: gsap.from(v, {y: "30", alpha:0, ease: 'sine.in'}),

            });        
        })

        // Quote animation
        contentRef.current.getElementsByTagName('q').forEach((v)=>{

            ScrollTrigger.create({
                trigger: v,
                start: 'top 90%',
                end: 'bottom 100%',
    
                scrub: 2.2,
                animation: gsap.from(v, {scale: 0.8, alpha:0, ease: 'sine.in'}),   
            });        
        })
        
    }, []);

    return (
        <section ref={sectionRef} className={`container feature ${props.panel}`}>
            <div className="panel" ref={panelRef}>
                <div className="bg">

                    <Collage {...props} />
                    <div className="audio">
                        <AudioPlayer title="" src={`<%= path %>/audio/${props.audio}`}  />
                        <div dangerouslySetInnerHTML={innerHTML(props.audioDesc)} ></div>
                    </div>
                </div>
            </div>
            
            <div className="content" ref={contentRef} dangerouslySetInnerHTML={innerHTML(props.content)}></div>
        </section>
    )
}

export default Section;