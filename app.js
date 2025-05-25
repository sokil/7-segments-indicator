const mask = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    dp: 7,
};

let commonCathodeSegments = 0x00;
let commonAnodeSegments = 0xFF;

document.querySelectorAll('#indicator .segment').forEach(element => {
    element.addEventListener('click', (e) => {
        // ui
        e.target.classList.toggle('active');
        const isSegmentActive = e.target.classList.contains('active');
        const segmentName = e.target.dataset.segment;

        // binary mask
        const segmentMaskPosition = mask[segmentName];

        // fill binary table
        document.getElementById('common-cathode-pin-' + segmentName).textContent = isSegmentActive ? 1 : 0;
        commonCathodeSegments = setBit(commonCathodeSegments, segmentMaskPosition, isSegmentActive ? 1 : 0);

        document.getElementById('common-anode-pin-' + segmentName).textContent = isSegmentActive ? 0 : 1;
        commonAnodeSegments = setBit(commonAnodeSegments, segmentMaskPosition, isSegmentActive ? 0 : 1);

        // fill hex value
        document.getElementById('common-cathode-hex-code').textContent = '0x' + commonCathodeSegments.toString(16).padStart(2, "0").toUpperCase();
        document.getElementById('common-anode-hex-code').textContent = '0x' + commonAnodeSegments.toString(16).padStart(2, "0").toUpperCase();
    })
})

function setBit(segments, segmentMaskPosition, bit) {
    if (bit === 0) {
        segments &= ~(1 << segmentMaskPosition);
    } else {
        segments |= (1 << segmentMaskPosition);
    }

    return segments;
}