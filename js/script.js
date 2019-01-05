$(document).ready(function () {
    let max = 6;
   $('.row-point').on('click', function () {
       if($(this).hasClass('blocked')){
           return false;
       }
       let row = $(this).parent().parent().find('.row-num')[0].dataset.row;
       let point=$(this)[0].innerHTML;
       let check = true;
       let thisBtn =$(this);
       if($('.select-point').length > 0){
           $('.select-point').each(function(indx, element){
               let selectRow = $(element)[0].dataset.row;
               if(selectRow == row){
                   let points = $(element).find('.point')[0].innerHTML.split(',');
                   if($.inArray(point,points) == -1){
                       if(max - 1 == 0){
                           return false;
                       }
                       points.push(point);
                       thisBtn.addClass('select');
                       $('#sum')[0].innerHTML = parseInt($('#sum')[0].innerHTML) + parseInt($('#price')[0].innerHTML);
                       max--;
                   }else{
                       points.splice(points.indexOf(point), 1);
                       thisBtn.removeClass('select');
                       $('#sum')[0].innerHTML = parseInt($('#sum')[0].innerHTML) - parseInt($('#price')[0].innerHTML);
                       max++;
                   }
                   points.sort(function(a, b) {
                       return a - b;
                   });
                   $(element).find('.point')[0].innerHTML = points.join(',');
                   check = false;
                   return false;
               }
           });
           if(check==true && max - 1 != 0){
               $('#select-points')[0].innerHTML += "<div class=\"select-point\" data-row=\""+row+"\">Ряд: <span class=\"select-row-num\">"+row+"</span> Место: <span class=\"point\">"+point+"</span></div>";
               thisBtn.addClass('select');
               $('#sum')[0].innerHTML = parseInt($('#sum')[0].innerHTML) + parseInt($('#price')[0].innerHTML);
               max--;
               return false;
           }
       }else{
           $('#select-points')[0].innerHTML = "<div class=\"select-point\" data-row=\""+row+"\">Ряд: <span class=\"select-row-num\">"+row+"</span> Место: <span class=\"point\">"+point+"</span></div>";
           thisBtn.addClass('select');
           $('#sum')[0].innerHTML = $('#price')[0].innerHTML;
           $('#sum').after(' руб');
           max--;
       }
   })
    $('#btn-gk').on('click', function () {
        let points = [];
        $('.session-room .row-point').each(function(indx, element){
            if ($(element).hasClass("select")){
                let row = $(element).parent().parent().find('.row-num')[0].dataset.row;
                points.push({
                    value: row,
                    label: $(element).html()
                });
            }
        });
        console.log(points);

    });
});