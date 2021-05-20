 
// menu-button toggle sidemenu start

 $("#header>.menu-button").click(function() {
 	$("#sidemenu").toggleClass("open");
 	$(".copyright").toggleClass("show");
 });
 $("#sidemenu, #top-bar, #content-wrapper").click(function(e) {
 	$("#sidemenu").removeClass("open");
 	$(".copyright").removeClass("show");
 }); 
 // menu-button toggle sidemenu end

// li active class add remove
 $(document).ready(function(){
    $('li ').click(function() {
        $("li").removeClass("link-active");
        $(this).addClass("link-active");
    });
});

// li active class add remove

 

$('.black-button').on({
     'click': function(){
         $('#change-image').attr('src','ass/images/user_icon.png');
     }
 });
 
$('.red-button').on({
     'click': function(){
         $('#change-image').attr('src','/wp-content/uploads/2018/09/red.jpg');
     }
 });
 
$('.blue-button').on({
     'click': function(){
         $('#change-image').attr('src','/wp-content/uploads/2018/09/blue.jpg');
     }
 });
 
$('.yellow-button').on({
     'click': function(){
         $('#change-image').attr('src','/wp-content/uploads/2018/09/yellow.jpg');
     }
 });
 