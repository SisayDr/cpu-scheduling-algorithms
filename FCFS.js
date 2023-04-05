var processes = [
        ['1', '0', '3'],
        ['2', '5', '2'],
        ['3', '5', '7'],
        ['4', '6', '3'],
        ['5', '8', '5']
    ];
    var PID = 0;
    var AT = 1;
    var BT = 2;

    var processes_table = document.getElementById("processes-table");
    var process_id_input = document.getElementById("process-id-input");
    var arrival_time_input = document.getElementById("arrival-time-input");
    var burst_time_input = document.getElementById("burst-time-input");
    var gant_chart_ids = document.getElementById("gant-chart-id");
    var gant_chart_time = document.getElementById("gant-chart-time");
   

    function draw_gant_chart(){
        gant_chart_ids.innerHTML = "";
        if(processes.length == 0){
            alert("Please, Enter Processes first!");
            return false;
        }

        let time = 0;
        gant_chart_time.innerHTML = "<td>"+time+"</td>\n";  
        for(let i=0; i<processes.length; i++){
            if(time < processes[i][AT]){
                gant_chart_ids.innerHTML += "<td class=\"shaded\"></td>\n";
                time = parseInt(processes[i][AT]);
                gant_chart_time.innerHTML += "<td style=\"width: "+20*(time - parseInt(processes[i][BT]))+"px;\">"+time+"</td>\n";
                time = parseInt(processes[i][AT]);
            }
            gant_chart_ids.innerHTML += "<td>P"+processes[i][PID]+"</td>\n";
            time += parseInt(processes[i][BT]);
            gant_chart_time.innerHTML += "<td style=\"width: "+20*parseInt(processes[i][BT])+"px;\">"+time+"</td>\n";
        }
        gant_chart_ids.getElementsByTagName("td")[0].setAttribute("colspan", "2");
        for(let i=0; i<processes.length; i++){
            time += parseInt(processes[i][BT]);
        }

        return false;

    }
    function sort_process(p1, p2){
        if(p1[AT] == p2[AT]){
            if(p1[BT] == p2[BT]){
                if(p1[PID] == p2[PID]){
                    return 0;
                }
                else return (p1[PID] < p2[PID]) ? -1 : 1;
            }
            else return (p1[BT] < p2[BT]) ? -1 : 1;
        }
        else return (p1[AT] < p2[AT]) ? -1 : 1;
    }
    function add_process(){
        processes.push([process_id_input.value, arrival_time_input.value, burst_time_input.value]);

        processes_table.innerHTML += "<tr>"+
            "<th>P"+process_id_input.value+"</th>"+
            "<th>"+arrival_time_input.value+"</th>"+
            "<th>"+burst_time_input.value+"</th>"+
        "</tr>";

        process_id_input.value = "";
        arrival_time_input.value = "0";
        burst_time_input.value = "";
        
        return false;

    } 
    function insert_processes(){
        processes_table.innerHTML = "<tr><th>PID</th><th>AT</th><th>BT</th></tr>";
        processes.forEach(p => {
        processes_table.innerHTML += "<tr>"+
                    "<th>P"+p[PID]+"</th>"+
                    "<th>"+p[AT]+"</th>"+
                    "<th>"+p[BT]+"</th>"+
                    
                "</tr>";
        });
    }
