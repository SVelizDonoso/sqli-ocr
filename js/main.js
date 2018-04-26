var db = new SQL.Database();
			function recognize_image(){
				document.getElementById('transcription').innerText = "(Recognizing...)"

				OCRAD(document.getElementById("pic"), {
					numeric: true
				}, function(text){
					
				})
			}
			function load_file () {
				var reader = new FileReader();
				reader.onload = function(){
					var img = new Image();
					img.width = "300";
					img.src = reader.result;
					img.onload = function(){
						document.getElementById('nose').innerHTML = ''
						document.getElementById('nose').appendChild(img)
						OCRAD(img, function(text){
							document.getElementById('transcription').className = "done"
							document.getElementById('transcription').innerText = text.toUpperCase().replace("\n","");
							searchPatente(text.toUpperCase().replace("\n",""));
						})
					}
				}
				reader.readAsDataURL(document.getElementById('picker').files[0])
			}
			function createdb(){
				
				db.run("CREATE TABLE PT (ID integer, PAT text);");
				db.run("INSERT INTO PT VALUES (?,?), (?,?),(?,?)", [1,"XB Z333",2,"AZ B217",3,"NN C133"]);
				var table =""
				table +="<table class='table table-bordered'>";
				table +="<tr><td>ID</td><td>PATENTE</td></tr>";
				var stmt = db.prepare("SELECT * FROM PT;");
				while(stmt.step()) { //
                    var row = stmt.getAsObject();
					table +="<tr><td>"+row['ID']+"</td><td>"+row['PAT']+"</td></tr>";
                }
				table +="</table>";
				$('#table_patente').html(table);
			}

			function searchPatente(p){
				var result =""
				var stmt = db.prepare("SELECT * FROM PT WHERE PAT='"+p+"';");
				$("#query").html("SELECT * FROM PT WHERE PAT='"+p+"';")
				if(stmt.step()){
					result ="<h3 style='color:green;'>OK</h3>";
					$("#barrera").html("<img class='img-fluid' src='img/moving.gif' height='200' width='250'>")
				}else{
					result ="<h3 style='color:red;'>FAIL!</h3>";
					$("#barrera").html("<img class='img-fluid' src='img/static.png' height='200' width='250'>");
				}
				document.getElementById('result').innerHTML = result;
				tableact();
				
			}

				function tableact(){
					var table =""
					table +="<table class='table table-bordered'>";
					table +="<tr><td>ID</td><td>PATENTE</td></tr>";
					var stmt = db.prepare("SELECT * FROM PT;");
					while(stmt.step()) { //
						var row = stmt.getAsObject();
						table +="<tr><td>"+row['ID']+"</td><td>"+row['PAT']+"</td></tr>";
					}
					table +="</table>";
					$('#table_patente').html(table);
					
				}
$(document).ready(function(){
 createdb();

});			
			
			