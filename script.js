$(function(){

    var flag=0;
    var pointer=0;
    var move;
    var rubber=0;
    var x1;//mousedown
    var y1;//mousedown
    var x2;//mouseup
    var y2;//mouseup
    var cx1;//for path x1
    var cy1;//for path y1
    var cx2;//for path x2
    var cy2;//for path y2
    var diffx;
    var diffy;

    var svg = Pablo('#client').svg({ //create svg with height and width
        width: 1100,
        height: 500
    });

    $('#line').click(function(){ //when id=line button clicked
        flag=1;//set flag line
        rubber=0;
    });

    $('#circle').click(function(){ //when id=circle button clicked
        flag=2;//set flag circle
        rubber=0;
    });
    $('#rectangle').click(function(){//when id=rectangle button clicked
        flag=3;//set flag rectangele
        rubber=0;
    });
    $('#path').click(function(){//when id=path button clicked
        flag=4;//set flag path
        rubber=0;
    });
    $('#pointer').click(function(){

        if($('#pointer').text()=='Pointer'){
            pointer=1;
            move=1;
            $('#pointer').text('Draw');
        }
        else{
            if($('#pointer').text()=='Draw'){
                pointer=0;
                move=1;
                $('#pointer').text('Pointer');
            }
        }

    });

    $('#rubber').click(function(){
        flag=-1;
        move=-1;
        rubber=1;

    });


    $('#client').mousedown(function(event){//when mouse down
        x1=event.clientX-406;//shear rate 406px--x coordinate
        y1=event.clientY-200;//shear rate 200px--y coordinate
        cx1=x1-100;
        cy1=y1-100;

    });

    $('#client').mouseup(function(event){//when mouse up
        x2=event.clientX-406;//shear rate 406px--x coordinate
        y2=event.clientY-200;//shear rate 200px--y coordinate
        cx2=x2-50;
        cy2=y2-50;

        if(flag==1&&pointer==0){

           svg.line({x1:x1,x2:x2,y1:y1,y2:y2,stroke:'green'}).on('click mousemove', function(event){
            if(pointer==1&&move==1){
                diffx=x1-x2;
                diffy=y1-y2;
                if(event.type=="mousemove"){

                    x1=event.clientX-406;
                    y1=event.clientY-200;
                    x2=x1-diffx;
                    y2=y1-diffy;
                    Pablo(this).attr('x1', x1-10);
                    Pablo(this).attr('y1', y1-10);
                    Pablo(this).attr('x2', x2-10);
                    Pablo(this).attr('y2', y2-10);
                }
                if(event.type=="click"){
                    move=0;
                }
            }else{
                if(event.type=="click"){
                    if(pointer==1&&move==0){
                        move=1;
                    }
                    if(rubber==1){
                        Pablo(event.target).remove();

                    }
                }
            }
           });

        }

        if(flag==2&&pointer==0){

          svg.circle({cx:x2, cy:y2, r:50, fill:'#ca973b'}).on('click mousemove', function(event){

            if(pointer==1&&move==1){

                if(event.type=="mousemove"){

                    x2=event.clientX-406;
                    y2=event.clientY-200;
                    Pablo(this).attr('cx', x2);
                    Pablo(this).attr('cy', y2);
                }
                if(event.type=="click"){
                    move=0;
                }
            }else{
                if(event.type=="click"){
                    if(pointer==1&&move==0){
                        move=1;
                    }
                    if(rubber==1){
                        Pablo(event.target).remove();

                    }
                }
            }

        });

        }


        if(flag==3&&pointer==0){

            svg.rect({width:200, height:100,x:x2,y:y2,fill:'#7c1814'}).on('click mousemove', function(event){

                if(pointer==1&&move==1){

                    if(event.type=="mousemove"){

                        x2=event.clientX-406;
                        y2=event.clientY-200;
                        Pablo(this).attr('x', x2-10);
                        Pablo(this).attr('y', y2-10);
                    }
                    if(event.type=="click"){
                        move=0;
                    }
                }else{
                    if(event.type=="click"){
                        if(pointer==1&&move==0){
                            move=1;
                        }
                        if(rubber==1){
                            Pablo(event.target).remove();

                        }
                    }
                }

            });

        }
        if(flag==4&&pointer==0){

             svg.path({
                d: 'M '+x2+' '+y2+' C '+cx2+' '+cy2+', '+cx1+' '+cy1+', '+x1+' '+y1+'',// path points are determined with d
                fill:  'none',
                stroke:'#3c287c',
                'stroke-width': 2,
                'stroke-linecap': 'round'
             }).on('click',function(){
               if(rubber==1){
                   Pablo(event.target).remove();//If rubber button is clicked, clicked path object is deleted
               }
                 if(pointer==1){//if drawing is not done
                    var path=Pablo(this);//I am transferring the path object.
                    var k=path.attr('d');//I choose d attribute
                    console.log(k);
                    i=k.split(',');//divide by comma character
                    console.log(i);
                    var first=i[0].split(' ');//I divide the first part by the space character.
                    var second=i[1].split(' ');//I divide the second part by the space character.
                    var third=i[2].split(' ');//I divide the third part by the space character.
                    console.log(first);
                    console.log(second);
                    console.log(third);


                    svg.circle({cx:first[4], cy:first[5], r:10, stroke:"black",fill:"none"}).on('click mousemove', function(event){

                        if(pointer==1&&move==1){//if the move is active

                            if(event.type=="mousemove"){

                                //new x2 and y2 coordinates are found.
                                x2=event.clientX-406;
                                y2=event.clientY-200;
                                //the circle is redrawn according to these points.
                                Pablo(this).attr('cx', x2);
                                Pablo(this).attr('cy', y2);
                                //new points and fragmented path are reassembled
                                var d=first[0].concat(' '+first[1]+' '+first[2]+' '+first[3]+' '+x2+' '+y2+','+second[0]+' '+second[1]+' '+second[2]+','+third[0]+' '+third[1]+' '+third[2]);

                                //path is redrawn.
                                path.attr('d',d);
                            }
                            if(event.type=="click"){
                                move=0;//stop motion
                            }
                        }else{
                            if(event.type=="click"){
                                if(pointer==1&&move==0){
                                    move=1;//start motion
                                }
                                if(rubber==1){
                                    Pablo(event.target).remove();//clear

                                }
                            }
                        }

                    });
                    svg.circle({cx:second[1], cy:second[2], r:10, stroke:"black",fill:"none"}).on('click mousemove', function(event){

                        if(pointer==1&&move==1){//if the move is active

                            if(event.type=="mousemove"){

                                //new x2 and y2 coordinates are found.
                                x2=event.clientX-406;
                                y2=event.clientY-200;
                                //the circle is redrawn according to these points.
                                Pablo(this).attr('cx', x2);
                                Pablo(this).attr('cy', y2);
                                //new points and fragmented path are reassembled
                                var d=first[0].concat(' '+first[1]+' '+first[2]+' '+first[3]+' '+x2+' '+y2+','+second[0]+' '+second[1]+' '+second[2]+','+third[0]+' '+third[1]+' '+third[2]);
                                //path is redrawn.
                                path.attr('d',d);
                            }
                            if(event.type=="click"){
                                move=0;//stop motion
                            }
                        }else{
                            if(event.type=="click"){
                                if(pointer==1&&move==0){
                                    move=1;//start motion
                                }
                                if(rubber==1){
                                    Pablo(event.target).remove();//clear

                                }
                            }
                        }

                    });
                  }
                 
             });
             //var circle1=Pablo.circle({cx:cx2, cy:cy2, r:5, stroke:"black",fill:"none"});
             //var circle2=Pablo.circle({cx:cx1, cy:cy1, r:5, stroke:"black",fill:"none"});


        }

    });

});
