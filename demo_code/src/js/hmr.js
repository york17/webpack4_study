export function hmr() {
    console.log('hello hmr webpack');
}


function testOneOf(){
    const fileExt = "js"
    if (fileExt === 'html') {
        return;
    }
    if (fileExt === 'png') {
        return;
    }
    if (fileExt === 'js') {
        return;
    }
    if (fileExt === 'jpg') {
        return;
    }   
}