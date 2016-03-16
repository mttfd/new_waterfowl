$(function() {
    var metadata = localStorage.getItem('');
    ocpu.seturl("http://public.opencpu.org/ocpu/github/bwk34/WENDY/R")
    if(!metadata) {
        var controller = new Controller();
        controller.init(metadata);
    }
});
