
 var processes = [
        [1, 0, 8],
        [2, 5, 2],
        [3, 1, 7],
        [4, 6, 3],
        [5, 8, 5]
    ];

    var PID = 0;
    var AT = 1;
    var BT = 2;

	var p = document.getElementById("p1");
    var processes_table = document.getElementById("processes-table");

    var quantum_number_input = document.getElementById("quantum-num-input");
    var process_id_input = document.getElementById("process-id-input");
    var arrival_time_input = document.getElementById("arrival-time-input");
    var burst_time_input = document.getElementById("burst-time-input");
    var gant_chart_ids = document.getElementById("gant-chart-id");
    var gant_chart_time = document.getElementById("gant-chart-time");
   

    function draw_round_robin_gant_chart(){
        processes.sort(sort_process);
        let Q = parseInt(quantum_number_input.value);
        if(isNaN(Q)){
            alert("Please, Enter the Quantum Number");
            return;
        }
        
        gant_chart_ids.innerHTML = "";
        if(processes.length == 0){
            alert("Please, Enter Processes first!");
            return false;
        }

        let waiting_list = [processes[0]];
        let finished_processes = [];
        let time = 0;

        gant_chart_time.innerHTML = "<td>"+time+"</td>\n";let i=0;
        while(waiting_list.length > 0){
            let wps = [];
            let idle_time, process_time;
            let current_process = waiting_list.shift();

        //check if cpu is idle (no process is present) and shade tha gant chart
            if(current_process[AT] > time){
                //shade
                gant_chart_ids.innerHTML += "<td class=\"shaded\"></td>\n";
                idle_time = current_process[AT] - time;
                time = current_process[AT];
                gant_chart_time.innerHTML += "<td style=\"width: "+20*idle_time+"px;\">"+time+"</td>\n";
            }

        //if new processes have arrived by the time the current process finishes execution add them to the waiting list 
            let finishing_time = (current_process[BT] > Q) ? time+Q : time+current_process[BT];
            processes.forEach(p => {
                if(!finished_processes.includes(p[PID]) && 
                    !waiting_list.some(waiting_process=>waiting_process[PID] == p[PID]) &&
                    finishing_time >= p[AT] &&
                    p[PID] != current_process[PID]
                ){
                    waiting_list.push(p);
                }
            });
            
        
        //if burst is less than or equal to quantum time just draw
            if(current_process[BT] <= Q){
                process_time = current_process[BT];
                //just draw
                gant_chart_ids.innerHTML += "<td>P"+current_process[PID]+"</td>\n";
                time += current_process[BT];
				finished_processes.push(current_process[PID]);

                finished_processes.push(p[PID])
            }
        //else draw up to qunatum number, update current proceses burst time and add to waiting list
            else{
                //draw up to Q time
                process_time = Q;
                gant_chart_ids.innerHTML += "<td>P"+current_process[PID]+"</td>\n";
                time += Q;

                current_process[BT] = current_process[BT]-Q;
                waiting_list.push(current_process);
            }
            gant_chart_time.innerHTML += "<td style=\"width: "+20*process_time+"px;\">"+time+"</td>\n";
        }
        gant_chart_ids.getElementsByTagName("td")[0].setAttribute("colspan", "2");
        //reset 
        waiting_list = [];
        finished_processes = [];
        time = 0;
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
        processes.push([parseInt(process_id_input.value), parseInt(arrival_time_input.value), parseInt(burst_time_input.value)]);

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
