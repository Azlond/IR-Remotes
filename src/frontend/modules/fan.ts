import { fanControlBinaryMapping } from '../../data/fan-mapping';

/**
 * either pass a svg element as first parameter, or have on available under the DOM-ID 'fan-remote-svg'
 */
export function FanRemote(svg: HTMLObjectElement = document.getElementById('fan-remote-svg') as HTMLObjectElement) {
    if (!svg) throw new Error('Missing element or dom-id');
    const assignKeyListeners = () => {
        const svgDoc = svg.contentDocument;
        if (!svgDoc) throw new Error('Missing contentDocument')
        const controlKeys = Object.keys(fanControlBinaryMapping);
        for (const key of controlKeys) {
            svgDoc.getElementById(key)?.addEventListener('click', () => {
                console.log('>>>> fetching: ', key)
                fetch(`/api/fan/${key}`);
            });
        }
    };
    if (svg.contentDocument) {
        assignKeyListeners();
    } else {
        svg.addEventListener('load', assignKeyListeners);
    }
};
