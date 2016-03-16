function Controller() {

}

Controller.prototype = {
    constructor: Controller,
    init: function(model) {
        //creat view
        this.views = Views();
        //create model
        this.model = Model();

        //varibles
        this.vars = [];

        this.cnt = 0;




        //if first time come
        if (!this.model) {
            //
            this.numOfVar = 0;

            //render view
            this.render("initPage");
            this.curVar = null;

        }

        //register events
        this.registerEvt();
    },
    render: function(page, afterRender) {
        switch (page) {
            case 'initPage':
                $("#app").html(this.views[page]());
                break;
            case 'inputIndPage':
                $("#app").html(this.views[page](this.curVal));
                break;
            case 'inputIndPageForage':
                $("#app").html(this.views[page](this.curVal));
                break;
            case 'inputIndPageBioentities':
                $("#app").html(this.views[page](this.curVal));
                break;
            case 'varDetailPage':
                $("#app").html(this.views[page](this.curVal));
                break;
            case 'forageMatrixPage':
                $("#app").html(this.views[page](this.curVal));
                break;
            case 'bioMatrixPage':
                $("#app").html(this.views[page](this.curVal, this.vars[0]));
                break;
            case 'inputDataPage':
                $("#app").html(this.views[page](this.curVal));
                this.curVal.setChart();
                break;
            case 'downloadPage':
                $("#app").html(this.views[page]());
                break;
            default:
                console.error("wrong page name! " + page);
                break;
        }

        if(afterRender && (typeof afterRender === 'function')) afterRender();

    },

    renderPartial: function() {

    },

    registerEvt: function() {
        var self = this;
        $("#app").on("click", "#var-input-field #btn1", function(evt) {
            evt.preventDefault();
            $("#main-footer").css("display", "none");
            this.numOfVar = 2;


            var v2 = new Variable();
            v2.init("Forage", 2);
            self.vars.push(v2);
            $("#side-nav .list-group").append("<li class='list-group-item'><span class='var-link'>Forage</span></li>");
            var v1 = new Variable();
            v1.init("Bioentity", 1);
            self.vars.push(v1);
            $("#side-nav .list-group").append("<li class='list-group-item'><span class='var-link'>Bioentity</span></li>");

            self.curVal = self.vars[self.cnt];
            if(self.vars[self.cnt].name == 'Forage'){
                self.render("inputIndPageBioentities");
            }
            else{
                self.render("inputIndPageForage");
            }
        });
        $("#app").on("click", "#var-input-field #btn2", function(evt) {
            evt.preventDefault();
            window.open(
              'file:///home/bing/Desktop/Ajax.html',
              '_blank'
            );
        });



        $("#app").on("submit", "#var-info", function(evt) {
            evt.preventDefault();
            var formData = $('#var-info').serializeArray();

            //到时候需要改成self.curVal.equals(新的var)
            if(self.curVal.inds.length === 0) {
                var inds = [];
                for (var i = 0; i < formData.length; i += 2) {
                    inds.push({
                        name: formData[i].value,
                        num: formData[i + 1].value
                    });
                }
                self.curVal.setIndInfo(inds);
                console.dir(inds);
            }


            self.render("varDetailPage", function() {

            });
        });

         $("#app").on("submit", "#ti-info", function(evt) {
            //alert("Asd");
            evt.preventDefault();
            var curVal = self.curVal;
            var formData = $('#ti-info').serializeArray();
            var ti = {};
            if(curVal.name == "Forage") {
                ti = {names: [], names2: [], areas: []};
                var num1 = curVal.inds[0].num;
                var num2 = curVal.inds[1].num;
                for(var i = 0; i < num1*2; i += 2) {
                    ti.names.push(formData[i].value);
                    ti.areas.push(formData[i+1].value);
                }

                for(var i = 0; i < num2; i++) {
                    ti.names2.push(formData[i+num1*2].value);
                }

            } else {
                ti = {names: []};
                for (var i = 0; i < formData.length; i++) {
                    ti.names.push(formData[i].value);
                }
            }

            self.curVal.setTIInfo(ti);
            curVal.name == "Forage" ? self.render("forageMatrixPage") : self.render("bioMatrixPage");
            console.dir(ti);
        });

        $("#app").on("submit", "#forage-matrix", function(evt) {

            evt.preventDefault();
            var curVal = self.curVal;
            var formData = $('#forage-matrix').serializeArray();
            var fMatrix = [];
            if(curVal.name == "Forage") {
                var nBlocks = $(".matrix-block").size();
                var nRows = $(".matrix-block-row").size();
                var rpb = nRows/nBlocks;
                for(var i = 0; i < nBlocks; i++) {
                    fMatrix[i] = [];
                    for(var j = 0; j < rpb; j++) {
                        fMatrix[i][j] = formData[i*rpb+j].value;
                    }
                }
            } else {

            }

            console.dir(fMatrix);
            self.curVal.setMatrix(fMatrix);
            self.render("inputDataPage", function() {
                self.curVal.drawPoints(self.curVal.getData());
            });

        });

         $("#app").on("submit", "#bio-matrix", function(evt) {

            evt.preventDefault();
            var curVal = self.curVal;
            var formData = $('#bio-matrix').serializeArray();
            var bMatrix = [];

            if(curVal.name == "Bioentity") {
                var nBlocks = $(".matrix-block").size();
                var nRows = $(".matrix-block-row").size();
                var rpb = nRows/nBlocks;
                var auxArr = [];

                for(var i = 0; i < nBlocks; i++) {
                    bMatrix[i] = [];
                    for(var j = 0; j < rpb; j++) {
                        bMatrix[i][j] = 0;
                    }
                }

                for(var i = 0; i < nBlocks; i++) {
                    auxArr[i] = 0;
                }

                for(var i = 0; i < formData.length; i++) {
                    var rc = formData[i].name.split("-").slice(1);
                    auxArr[rc[0]]++;

                }

                for(var i = 0; i < formData.length; i++) {
                    var rc = formData[i].name.split("-").slice(1);
                    bMatrix[rc[0]][rc[1]] = 1/auxArr[rc[0]];
                }



            } else {

            }

            console.dir(bMatrix);
            self.curVal.setMatrix(bMatrix);
            self.render("inputDataPage", function() {
                self.curVal.drawPoints(self.curVal.getData());
            });

        });


        $("#app").on("keydown", ".data-val:last-child", function(evt) {

        	if(evt.which == 13) {
        		//alert("ASd");
        		var data = [];
        		$(".data-val").each(function() {
        			var val = $(this).val().trim();
        			if (val) data.push(parseFloat(val));
        		});

        		//if(data.length != self.curVal.numOfInd) return;
        		$(".data-val").each(function() {
        			$(this).val("");
        		});

                $(".value-input:first-child input").focus();
        		//console.log(data);
                self.curVal.drawPoint(data);

                self.curVal.addData(data);
                console.log(data);
        	}
        });

        $("#app").on("click", ".next-chart", function(evt) {

            var next = self.curVal.next();
            if(!next) {
                if(self.cnt == self.vars.length-1) {
                    self.render("downloadPage");
                    return;
                }
                self.cnt++;
                self.curVal = self.vars[self.cnt];
                if(self.vars[self.cnt].name == 'Forage'){
                    self.render("inputIndPageBioentities");
                }
                else{
                    self.render("inputIndPageForage");
                }
                console.dir(self.vars);
                return;
            }

            self.render("inputDataPage", function() {
                self.curVal.drawPoints(self.curVal.getData());
            });

        });

        $("#app").on("click", ".prev-chart", function(evt) {

            var prev = self.curVal.prev();
            if(!prev) {

                // self.cnt++;
                // self.curVal = self.vars[self.cnt];
                // self.render("inputIndPage");

                return;
            }

            self.render("inputDataPage", function() {
                self.curVal.drawPoints(self.curVal.getData());
            });

        });

        $("#app").on("click", "#switch-input", function() {
            if($(".value-input").css("display") == "block") {
                $(".value-input").css("display", "none");
                $(".handinput").css("display", "inline-block");
            } else {
                $(".handinput").css("display", "none");
                $(".value-input").css("display", "block");
            }
        });


        $("#app").on("click", ".getexcel", function(evt) {
            var valuex = document.getElementById("excel0");
            var valuey = document.getElementById("excel1");
            var data = [];
            var stx = valuex.value+"\n";
            var sty = valuey.value+"\n";
            //if ( stx.split(",") != null ){ Astx = stx.split(",");}
            if ( stx.split("\n") != null ){ Astx = stx.split("\n");}
            //if ( sty.split(",") != null ){ Asty = sty.split(",");}
            if ( sty.split("\n") != null ){ Asty = sty.split("\n");}
            //Maybe simply Ast = st.split("\n");
            for (i=0; i<Astx.length - 1; i++) {
                data = [];
                var val = Astx[i].trim();
                if (val) data.push(parseInt(val));
                val = Asty[i].trim();
                if (val) data.push(parseInt(val));
                self.curVal.drawPoint(data);

                self.curVal.addData(data);
                console.log(data);
            }
                //self.curVal.chart.series[0].addPoint(null,true);
            document.body.appendChild(newTable);

        });

        $("#side-nav ul").on("click", ".var-link", function(evt) {

            for(var i = 0; i < self.vars.length; i++) {
                if(self.vars[i].name == $(this).html()) {
                    self.curVal = self.vars[i];
                    self.cnt = i;
                    break;
                }
            }

            if(self.vars[self.cnt].name == 'Forage'){
                self.render("inputIndPageBioentities");
            }
            else{
                self.render("inputIndPageForage");
            }
        });



        $(window).bind('beforeunload', function(){
            return 'Please click buttons on the web page to navigate. If you really want to leave this website, all the data will be saved.';
        });

        $("#app").on("click", "#final-submit", function(){

            //arguments
            //var myheader = $("#header").val() == "true";
            var header = true;


            var data = [self.vars[0].data, self.vars[1].data];

            console.dir(data);

            var jsonStruct = {
                N_FORAGES: [],
                FORAGE_NAME: [],
                TOTAL_AREA_BY_FORAGE: [],
                AVAIL_TIME: [],
                forage1: [],
                forage2: [],
                forage3: [],
                forage4: [],
                N_FOODTYPES: [],
                FOOD_TYPE: [],
                Density_forage1: [],
                dforage2: [],
                dforage3: [],
                dforage4: [],
                N_GUILDS: [],
                GUILDS_NAME: [],
                pref1: [],
                pref2: [],
                POP_TIME: [],
                INTAKE_TIME: []

            };


            //disable the button during upload
            //$("#final-submit").attr("disabled", "disabled");

            //perform the request
            // var req = ocpu.call("WENDY1", {
            //   file : myfile
            // //  header : myheader
            // }, function(session){
            //   // $("#printlink").attr("href", session.getLoc() + ".val/print")
            //   // $("#rdalink").attr("href", session.getLoc() + ".val/rda")
            //   // $("#csvlink").attr("href", session.getLoc() + ".val/csv")
            //   // $("#tablink").attr("href", session.getLoc() + ".val/tab")
            //   // $("#jsonlink").attr("href", session.getLoc() + ".val/json")
            //   // $("#mdlink").attr("href", session.getLoc() + ".val/md")
            //   // $("#plot").attr("href", session.getLoc() + "graphics/1/png?width=1000")
            //   // $("#plot2").attr("href", session.getLoc() + "graphics/2/png?width=1000")
            //   // $("#plot3").attr("href", session.getLoc() + "graphics/3/png?width=1000")
            //   // $("#stdout").attr("href", session.getLoc() + "stdout")
            //   // $("#result").attr("href", session.getLoc() + "files/result.csv")
            //   // $("#messages").attr("href", session.getLoc() + "messages")
            // });

            // //if R returns an error, alert the error message
            // req.fail(function(){
            //     alert("Server error: " + req.responseText);
            // });

            // //after request complete, re-enable the button
            // req.always(function(){
            //     $("#final-submit").removeAttr("disabled")
            // });
        });

    }
}

function Variable() {

}

Variable.prototype = {
    constructor: Variable,



    init: function(name, numOfInd) {
        //name of the variable
        this.name = name;
        //number of indices(suffix)
        this.numOfInd = numOfInd;
        //counter
        this.cnt = 0;
        //data
        this.data = {};
        //indices
        this.inds = [];
    },

    //indArr [{name: ind1, num: 10}, ...]
    setIndInfo: function(indArr) {
        if (indArr.length == 0 || indArr.length >= 3) return;
        this.inds = indArr;

        this.seq = [];

        for(var i = 0; i < indArr[0].num; i++) {
            this.seq.push(i);
            this.data["e"+i] = [];
        }
    },

    next: function() {
        if (this.cnt == this.seq.length-1) {
            this.cnt = 0;
            return false;
        }
        console.log(this.cnt);

        this.cnt++;
        return true;
    },

    prev: function() {
        if(this.cnt === 0) {
            return false;
        }

        this.cnt--;
        return true;
    },

    addData: function(data) {
        var cur = this.seq[this.cnt];
        console.log(this.seq);
        this.data["e"+cur].push(data);
    },



    removePoint: function(data) {
        var cur = this.seq[this.cnt];
        var curDataList = Array.isArray(cur) ? "e"+cur[0]+"-"+cur[1] : "e"+cur;

        for(var i = 0; i < this.chart.series[0].data.length; i++) {
            console.log(data.x + " " + this.chart.series[0].data[i].x + " | " +  data.y + " " + this.chart.series[0].data[i].y);
            if(data.x === this.chart.series[0].data[i].x && data.y === this.chart.series[0].data[i].y) {
                this.chart.series[0].data[i].remove();
                this.data[curDataList].splice(i, 1);
            }
        }
    },

    drawPoint: function(data) {
        this.chart.series[0].addPoint(data);
    },

    drawPoints: function(data) {
        for(var i = 0; i < data.length; i++) {
            this.drawPoint(data[i]);
        }
    },

    getData: function() {
        var indArr = this.inds;
        var varName = this.name;
        var cnt = this.seq[this.cnt];
        var singleSuffix = !Array.isArray(cnt);
        return  singleSuffix ? this.data["e"+cnt] : this.data["e"+cnt[0]+"-"+cnt[1]];
    },

    setTIInfo: function(ti) {
        this.data.ti = ti;
    },

    setMatrix: function(matrix) {
        this.data.matrix = matrix;
    },

    setChart: function() {
        var self = this;
        $('#chart').highcharts({
            title: {
                text: 'Waterfowl Food Energy',
                x: -20 //center
            },
            xAxis: {
                title: {
                    text: "t"
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            yAxis: {
                title: {
                    text: "v(t)"
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'kg'
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                $(".value-input:first-child input").val(this.x);
                                $(".value-input:nth-child(2) input").val(this.y);

                                self.removePoint(this);
                                $(".value-input:first-child input").focus();
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: this.name,
                //data: [[2, 0.0], [3, 7.0], [5, 6.9]]
            }]
        });

		var index = $("#chart").data('highchartsChart');
    	this.chart = Highcharts.charts[index];

    }

}
