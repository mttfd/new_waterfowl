function Views() {
	return {
		initPage: function() {
			return '<div id="var-input-field" class="container-fluid ">' +
	 				'<form id="general-info">' +
//	                    '<div class="form-group">' +
//	                        '<label for="var-num">Number of Variables</label>' +
//	                        '<input type="number" class="form-control" min="0" max="20" id="var-num" name="var-num" required>' +
//	                    '</div>' +
	                    '<image src="./public/imgs/waterfowl.jpg" width="100%" style="margin-bottom: 20px;">' +
	                    '<button type="submit" class="btn btn-default" id="btn1" style="display: block;">start</button>' +
	                    '<button type="submit" class="btn btn-default" id="btn2" style="display: none;">test ocpu</button>' +
	                '</form>' +
	            '</div>';
		},

		initVarPage: function() {
			return '<div id="var-input-field" class="container-fluid ">' +
	 				'<form id="general-info">' +
	                    '<div class="form-group">' +
	                        '<label for="var-num">Number of Variables</label>' +
	                        '<input type="number" class="form-control" min="0" max="20" id="var-num" name="var-num" required>' +
	                    '</div>' +
	                    '<button type="submit" class="btn btn-default" style="display: block;">next</button>' +
	                '</form>' +
	            '</div>';
		},

		varDetailPage: function(curVal) {
			var str = '<h3 style="margin-top: 0; margin-bottom: 30px;">Time independent variables</h3>';
			var varName = curVal.inds[0].name;
			var varNum = curVal.inds[0].num;
			if(varName == "Bioentity") {
				str += '<form id="ti-info"><h4>Bioentities</h4>';
				str += '<div class="ti-block">';
				for(var i = 0; i < varNum; i++) {
					str += '<div ><label>name' + (i+1) + '</label><input type="text" name="n-' + i + '" required></div>';
				}
				str += "</div>";
			} else if(varName == "Habitat"){

				str += '<form id="ti-info">';
				str += "<h4>Habitats</h4>";
				str += '<div class="ti-block">';
				for(var i = 0; i < varNum; i++) {
					str += '<div ><label>name' + (i+1) + '</label><input type="text" name="hn-' + i + '"required> <label>total area' + (i+1) + '</label><input type="number" name="total-ar-' + i + '" required></div>';
				}
				str += "</div>";
				str += "<h4>Food Types</h4>";
				str += '<div class="ti-block">';
				for(var i = 0; i < curVal.inds[1].num; i++) {
					str += '<div ><label>name' + (i+1) + '</label><input type="text" name="fn-' + i + '" required></div>';
				}
				str += "</div>";
			} else {
				return "<div>Something wrong...</div>";
			}

			str += "<input type='submit' value='submit' id='ti-info-btn'></form>";
			return str;
		},

		forageMatrixPage: function(curVal) {
			var str = '<h3 style="margin-top: 0; margin-bottom: 20px;">Forage Matrix</h3><form id="forage-matrix">';
			var names1 = curVal.data.ti.names;
			var names2 = curVal.data.ti.names2;

			var num1 = names1.length;
			var num2 = names2.length;
			for(var i = 0; i < num1; i++) {
				str += "<div class='matrix-block' style='display: inline-block; border: 1px solid #6b6b6b; padding: 15px; margin: 15px 40px 15px 0px'>" + "<h4 style='padding-bottom: 10px; margin-top: 0; border-bottom:1px solid black;'>" + names1[i] + "</h4>";
				for(var j = 0; j < num2; j++) {
					str += "<div class='matrix-block-row'><label>" + names2[j] + "</label><input type='number' name='fm-" + i + "-" + j + "' required value=0></div>"
				}
				str += "</div>";
			}

			return str+'<input style="display:block" type="submit" value="submit"></form>';
		},

		bioMatrixPage: function(curVal, prevVal) {
			var str = '<h3 style="margin-top: 0; margin-bottom: 20px;">Bioentity Matrix</h3><form id="bio-matrix">';
			var names1 = curVal.data.ti.names;
			var names2 = prevVal.data.ti.names2;

			var num1 = names1.length;
			var num2 = names2.length;
			for(var i = 0; i < num1; i++) {
				str += "<div class='matrix-block' style='display: inline-block; border: 1px solid #6b6b6b; padding: 15px; margin: 15px 40px 15px 0px'>" + "<h4 style='padding-bottom: 10px; margin-top: 0; border-bottom:1px solid black;'>" + names1[i] + "</h4>";
				for(var j = 0; j < num2; j++) {
					str += "<div class='matrix-block-row'><label>" + names2[j] + "</label><input type='checkbox' name='bm-" + i + "-" + j + "'></div>"
				}
				str += "</div>";
			}

			return str+'<input style="display:block" type="submit" value="submit"></form>';
		},

		inputIndPage: function(curVal) {
			var str = '';
			var initiated = (curVal.inds.length !== 0);

			for(var i = 0; i < curVal.numOfInd; i++) {
				str += '<div class="form-group form-inline">' +
	                        '<label >Name of subscript</label>' +
	                        '<input type="text" class="form-control ind-name" value="' + (initiated ? curVal.inds[i].name : "") +
	                        '" name="ind-name-' + i + '" required >' +
	                        '<label>Number</label>' +
	                        '<input type="number" class="form-control ind-num" value="' + (initiated ? curVal.inds[i].num : "") +
	                        '" name="ind-num-' + i + '" min="0" max="10" required>' +
	                    '</div>';
			}

			return '<div class="col-md-8">' +
					'<h2 class="var-name-input">' +  curVal.name + '</h2>' +
	                '<form id="var-info">' +
	                        str + '<button type="submit" class="btn btn-default">go</button>' +
	                '</form>' +
	            '</div>';
		},
		inputIndPageForage: function(curVal) {
			var str = '';
			var initiated = (curVal.inds.length !== 0);
			for(var i = 0; i < curVal.numOfInd; i++) {
				str += '<div class="form-group form-inline">' +
	                        '<input type="hidden" class="form-control ind-name" value="' + (initiated ? curVal.inds[i].name : "Bioentity") +
	                        '" name="ind-name-' + i + '" required >' +
	                        '<label>Number of Bioentities</label>' +
	                        '<input type="number" style="margin-left: 10px;" class="form-control ind-num" value="' + (initiated ? curVal.inds[i].num : "") +
	                        '" name="ind-num-' + i + '" min="0" max="10" required>' +
	                    '</div>';
			}

			return '<div class="col-md-8">' +
					'<h2 class="var-name-input">' +  curVal.name + '</h2>' +
	                '<form id="var-info">' +
	                        str + '<button type="submit" class="btn btn-default">go</button>' +
	                '</form>' +
	            '</div>';
		},
		inputIndPageBioentities: function(curVal) {
			var str = '';
			var initiated = (curVal.inds.length !== 0);
			var i = 0;
				str += '<div class="form-group form-inline">' +
	                        //'<label >Name of Habitat</label>' +
	                        '<input type="hidden" class="form-control ind-name" value="' + (initiated ? curVal.inds[i].name : "Habitat") +
	                        '" name="ind-name-' + i + '" required >' +
	                        '<label>Number of Habitats</label>' +
	                        '<input type="number" class="form-control ind-num" value="' + (initiated ? curVal.inds[i].num : "") +
	                        '" name="ind-num-' + i + '" min="0" max="10" required>' +
	                    '</div>';
	                    i++;
				str += '<div class="form-group form-inline">' +
	                        //'<label >Name of Forages</label>' +
	                        '<input type="hidden" class="form-control ind-name" value="' + (initiated ? curVal.inds[i].name : "Forage") +
	                        '" name="ind-name-' + i + '" required >' +
	                        '<label>Number of Forages</label>' +
	                        '<input type="number" class="form-control ind-num" value="' + (initiated ? curVal.inds[i].num : "") +
	                        '" name="ind-num-' + i + '" min="0" max="10" required>' +
	                    '</div>';


			return '<div class="col-md-8">' +
					'<h2 class="var-name-input">' +  curVal.name + '</h2>' +
	                '<form id="var-info">' +
	                        str + '<button type="submit" class="btn btn-default">go</button>' +
	                '</form>' +
	            '</div>';
		},

		inputDataPage: function(curVal) {
			var indArr = curVal.inds;
			var varName = curVal.name;
			var cnt = curVal.seq[curVal.cnt];
			var numOfInd = indArr.length;
			var varArr = ['t', 'v(t)'];
			var str = '', subs = '';



			var singleSuffix = !Array.isArray(cnt);


			for(var i = 0; i < varArr.length; i++) {
				str += '<div class="form-group form-inline value-input">' +
	                        '<label>' + varArr[i] + '</label>' +
	                        '<input type="text" class="form-control data-val" required>' +
	                    '</div>';
			}
			for(var i = 0; i < varArr.length; i++) {
				str += '<div class="form-group form-inline handinput">' +
	                        '<label>' + varArr[i] + '</label>' +
	                        '<textarea rows=3 cols=6 class="form-control" id="excel' + i + '" required> </textarea>' +
	                    '</div>';
			}

			subs += '<span>' + curVal.data.ti.names[cnt] + ' </span>';

			return '<div class="col-md-12">' +
	                '<h2 class="var-name-displ">' + varName + '</h2>' +
	                '<div class="for-subs"><span>For </span>' + subs + '<button id="switch-input">switch</button></div>' +
	                '<div id="var-info" >' +
	                     str + '<button type="submit" class="btn btn-default getexcel handinput" id="getexcel" name="getexcel">Copy from excel</button>' +
	  					//'<button  class="btn btn-default add-val">add</button>' +
	  					'<div  id="chart" style=" height: 400px; margin: 0 auto"></div>'+
	  					((singleSuffix && cnt === 0) || (!singleSuffix && cnt[0] === 0 && cnt[1] === 0) ? '' : '<button  class="btn btn-default prev-chart">prev chart</button>') +
	  					'<button class="btn btn-default next-chart">next chart</button></div></div>';
		},

		downloadPage: function() {
			return '<button class="btn">download</button><button id="final-submit" class="btn">submit</button>';
		},

		sideBar: function() {
			return ''
		}
	}

}
