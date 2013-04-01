/* **********************************************
     Begin emoome-settings-model.js
********************************************** */// Emoome Settings
var EmoomeSettings=Backbone.Model.extend({type_colors:{emotional:"#ff0000",intellectual:"#142bd7",descriptive:"#dcca07",sensory:"#0aa80e",action:"#ee9700",physical:"#cf00ee",undecided:"#c3c3c3"},word_types:{E:"emotional",I:"intellectual",D:"descriptive",S:"sensory",A:"action",P:"physical",U:"undecided"},types_count:{E:0,I:0,D:0,S:0,A:0,P:0,U:0},word_types_sub:{M:"moral",S:"slang",P:"perception",Y:"psychological",L:"feeling",F:"food",C:"common",U:"undecided"},types_sub_count:{M:0,S:0,P:0,Y:0,L:0,F:0,C:0},core_emotions:{10:"joy",9:"happy",8:"amazement",7:"serenity",6:"interest",5:"optimism",4:"happy",3:"goofy",2:"acceptance",1:"surprise",0:"neutral","-1":"annoyed","-2":"crazy","-3":"disapproval","-4":"disgust","-5":"fear","-6":"sad","-7":"shame","-8":"grief","-9":"loathing","-10":"anger","-11":"rage"},visualization_sizes:{mobile:{pie_word_types_container:300,pie_word_types:125,circle_strong_experiences:5},tablet:{pie_word_types_container:225,pie_word_types:75,circle_strong_experiences:10},web:{pie_word_types_container:325,pie_word_types:162,circle_strong_experiences:10}}}),EmoomeSettings=new EmoomeSettings,UIMessages=Backbone.Model.extend({log_feeling_complete:["Every entry helps us build your emotional map","We suggest logging 1-2 entries per day","Try logging entries at different times of the day","The best entries are when you feel something strongly","If something is hard to describe it is a good entry","The best entries are moments that seem important","Had an intense experience? Log an entry for later analysis"],memory_quote:["Memory is the scribe of the soul. ~Aristotle","It is a poor sort of memory that only works backwards. ~Lewis Carroll"]}),UIMessages=new UIMessages,UserModel=Backbone.Model.extend({defaults:{logged:"no",user_id:"",username:"",user_level_id:"",name:"",email:"",phone_number:"",image:"",location:"",geo_enabled:"",language:"",privacy:"",consumer_key:"",consumer_secret:"",token:"",token_secret:"",source:"web",user_meta:{},notifications_frequency:"daily",notifications_sms:"yes",notifications_email:"yes",default_feeling_type:"text"},initialize:function(){}}),UserModel=new UserModel,LogFeelingModel=Backbone.Model.extend({defaults:{source:"web",feeling:"",experience:"",describe_1:"",describe_2:"",describe_3:"",time_feeling:0,time_experience:0,time_describe:0,time_total:0,geo_lat:0,geo_lon:0},initialize:function(){},startFeeling:function(){this.set({time_feeling:(new Date).getTime()})},processFeeling:function(e){var t=(new Date).getTime(),n=t-this.get("time_feeling");this.set({feeling:e,time_feeling:n,time_experience:t})},processExperience:function(){var e=(new Date).getTime(),t=e-this.get("time_experience");this.set({type:"experience",experience:$("#log_experience_value").val(),time_experience:t,time_describe:e})},processDescribe:function(){var e=(new Date).getTime(),t=e-this.get("time_describe"),n=this.get("time_feeling")+this.get("time_experience")+t;this.set({time_describe:t,time_total:n,describe_1:$("#log_describe_1_value").val(),describe_2:$("#log_describe_2_value").val(),describe_3:$("#log_describe_3_value").val()})},returnData:function(){var e=[];$.each(LogFeelingModel.attributes,function(t,n){e.push({name:t,value:n})});return e}}),LogFeelingModel=new LogFeelingModel,VisualizeModel=Backbone.Model.extend({defaults:{status:"error",message:"No data loaded yet",logs_count:0,last_five:{},all_time:{},strong_experiences:{},data:"empty"}}),VisualizeModel=new VisualizeModel,VisualizeLanguageModel=Backbone.Model.extend({defaults:{status:"error",message:"No data loaded yet",logs:{},words:{},data:"empty"}}),VisualizeLanguageModel=new VisualizeLanguageModel,LightboxView=Backbone.View.extend({initialize:function(){this.render()},render:function(){var e={lightbox_message:"Yo dog, sup?"},t=_.template($("#ligthbox_template").html(),e);this.$el.append(t)},requestMade:function(e){$("#lightbox_message").removeClass("lightbox_message_success lightbox_message_error").addClass("lightbox_message_normal").html(e);$("#request_lightbox").delay(150).fadeIn();if(UserData.get("source")==="mobile"){$("#lightbox_message").css("top",$(window).scrollTop()+50);$("#request_lightbox").height($("body").height()+150)}else{$("#lightbox_message").css("top",$(window).scrollTop()+100);$("#request_lightbox").height($("body").height()+100)}},requestComplete:function(e,t){$("#lightbox_message").html(e);if(t==="success"){$("#lightbox_message").addClass("lightbox_message_success");$("#request_lightbox").delay(250).fadeOut()}else{$("#lightbox_message").addClass("lightbox_message_error");$("#request_lightbox").delay(2e3).fadeOut()}},printUserMessage:function(e){$("#lightbox_message").removeClass("lightbox_message_success lightbox_message_error").addClass("lightbox_message_normal").html(e);$("#request_lightbox").delay(150).fadeIn();$("#request_lightbox").delay(1e3).fadeOut()},closeFast:function(){$("#request_lightbox").fadeOut("fast")}}),Lightbox=new LightboxView({el:$("body")}),NavigationView=Backbone.View.extend({initialize:function(){this.render()},render:function(){UserData.get("user_id")!=""?this.showLogged():this.showPublic();if(UserData.get("source")!="mobile"){this.showLogo();$("#navigation_menu").show()}},events:{"click #navigation_logo":"goToIndex","click .navigation_link":"toggleLinkSelected"},showPublic:function(){$("#navigation_info").html('<h1 class="navigation_title"><a href="/#/">emo<span class="name_ome">ome</span></a></h1>');var e=['<li id="navigation_link_home"><a href="/#" class="navigation_link"><span class="icon-home"></span> Home</a></li>','<li><a href="/#login" class="navigation_link"><span class="icon-keyhole"></span> Login</a></li>','<li><a href="/#signup" class="navigation_link"><span class="icon-person"></span> Signup</a></li>'];this.showNavigation(e)},showLogged:function(){$("#navigation_info").html('<img src="'+UserData.get("image")+'"> <h1>'+UserData.get("name")+"</h1>");var e=['<li><a href="/#record/feeling" class="navigation_link"><span class="icon-pencil"></span> Record</a></li>','<li><a href="/#visualize" class="navigation_link"><span class="icon-eye"></span> Visualize</a></li>','<li><a href="/#settings" class="navigation_link"><span class="icon-gears"></span> Settings</a></li>'];this.showNavigation(e)},showNavigation:function(e){$("#navigation_menu_links").html("");$.each(e,function(e,t){$("#navigation_menu_links").append(t)});setInterval(function(){$("#navigation_menu_links").fadeIn()},250)},showLogo:function(){var e=new Raphael(document.getElementById("navigation_logo"),200,50),t=0,n=0,r=[4,7,8,6,5,9],i=0;$.each(EmoomeSettings.type_colors,function(s,o){if(s!="undecided"){t=0;n+=r[i]*2;console.log("loop: "+i+" count_x: "+t+" circle_x: "+n+" size: "+r[i]);circle=e.circle(n,25,r[i]).attr({fill:o,opacity:0,"stroke-width":0});circle.animate({opacity:1},1e3);n+=10;i++}})},toggleLinkSelected:function(e){setInterval(function(){},250)},goToIndex:function(){Backbone.history.navigate("#/",!0)}}),ContentView=Backbone.View.extend({initialize:function(e){this.view=e},render:function(){var e=$(this.view).html();$(this.el).html(e).hide().delay(250).fadeIn();return this}}),AuthView=Backbone.View.extend({initialize:function(){this.render()},render:function(){},events:{"click #button_login":"processLogin","click #button_signup":"processSignup","click #button_signup_short":"processSignupShort","click #button_forgot_password":"processForgotPassword"},viewLogin:function(){var e=_.template($("#login").html());this.$el.html(e).hide().delay(250).fadeIn()},viewSignup:function(){var e=_.template($("#signup").html());this.$el.html(e).hide().delay(250).fadeIn()},viewForgotPassword:function(){var e=_.template($("#forgot_password").html());this.$el.html(e).hide().delay(250).fadeIn()},processLogin:function(){$.validator({elements:[{selector:"#login_email",rule:"email",field:"Please enter a valid Email",action:"label"},{selector:"#login_password",rule:"require",field:"Please enter your Password",action:"label"}],message:"",success:function(){var e=$("#user_login").serializeArray();e.push({name:"session",value:"1"});$.ajax({url:base_url+"api/users/login",type:"POST",dataType:"json",data:e,beforeSend:Lightbox.requestMade("Logging You In"),success:function(e){Lightbox.requestComplete(e.message,e.status);if(e.status=="success"){$("[name=email]").val("");$("[name=password]").val("");UserData.set({logged:"yes"});UserData.set(e.user);var t=new NavigationView({el:$("#navigation")});t.renderLogged();Backbone.history.navigate("#/record/feeling",!0)}}})}})},processSignup:function(){$.validator({elements:[{selector:"#signup_name",rule:"require",field:"Enter your name",action:"label"},{selector:"#signup_email",rule:"email",field:"Please enter a valid email",action:"label"},{selector:"#signup_password",rule:"require",field:"Please enter a password",action:"label"}],message:"",success:function(){var e=$("#user_signup").serializeArray();e.push({name:"session",value:"1"},{name:"password_confirm",value:$("#signup_password").val()});$.ajax({url:base_url+"api/users/signup",type:"POST",dataType:"json",data:e,beforeSend:Lightbox.requestMade("Creating Account"),success:function(e){Lightbox.requestComplete(e.message,e.status);if(e.status=="success"){$("[name=name]").val("");$("[name=email]").val("");$("[name=password]").val("");UserData.set({logged:"yes"});UserData.set(e.user);var t=new NavigationView({el:$("#navigation")});t.renderLogged();Backbone.history.navigate("#/record/feeling",!0)}}})}})},processSignupShort:function(e){e.preventDefault();$.validator({elements:[{selector:"#signup_name_short",rule:"require",field:"Enter your name",action:"label"},{selector:"#signup_email_short",rule:"email",field:"Please enter a valid email",action:"label"},{selector:"#signup_password_short",rule:"require",field:"Please enter a password",action:"label"}],message:"",success:function(){var e=$("#user_signup_short").serializeArray();e.push({name:"session",value:"1"},{name:"password_confirm",value:$("#signup_password_short").val()});$.ajax({url:base_url+"api/users/signup",type:"POST",dataType:"json",data:e,beforeSend:Lightbox.requestMade("Creating Account"),success:function(e){Lightbox.requestComplete(e.message,e.status);if(e.status=="success"){$("[name=name]").val("");$("[name=email]").val("");$("[name=password]").val("");UserData.set({logged:"yes"});UserData.set(e.user);var t=new NavigationView({el:$("#header")});t.renderLogged();Backbone.history.navigate("#/record/feeling",!0)}}})}})},processForgotPassword:function(){$.validator({elements:[{selector:"#forgot_email",rule:"email",field:"Please enter a valid email",action:"label"}],message:"",success:function(){$.ajax({url:base_url+"api/users/password_forgot",type:"POST",dataType:"json",data:$("#user_forgot_password").serializeArray(),beforeSend:Lightbox.requestMade("Resetting Password"),success:function(e){Lightbox.requestComplete(e.message,e.status);Backbone.history.navigate("#/login",!0)}})}})}}),RecordFeelingView=Backbone.View.extend({initialize:function(){this.render()},render:function(){},events:{"click #log_feeling_use_text":"viewFeelingText","click #log_feeling_use_emoticons":"viewFeelingEmoticons","click #log_feeling_use_audio":"viewFeelingAudio","click a.log_save_feeling":"processFeeling","click div.emoticon_item":"processFeelingEmoticons","click #log_feel_next":"processFeelingText","click #log_experience_next":"processExperience","click #log_describe_next":"processDescribe"},displayRecordType:function(e){UserData.set({default_feeling_type:e});$.each(["text","emoticons","audio"],function(t,n){n===e?$("#record_feeling_"+n).fadeIn():$("#record_feeling_"+n).hide();$("#log_feeling_use_"+n).addClass("icon_small_"+n)});$("div.left_control_links").removeClass("icon_small_text_select icon_small_emoticons_select icon_small_audio_select");$("#log_feeling_use_"+e).removeClass("icon_small_"+e).addClass("icon_small_"+e+"_select")},viewFeeling:function(){LogFeelingModel.startFeeling();if(navigator.geolocation){function e(e){LogFeelingModel.set({geo_lat:e.coords.latitude,geo_lon:e.coords.longitude})}navigator.geolocation.getCurrentPosition(e)}var t=_.template($("#record_feeling").html());this.$el.html(t).hide().delay(250).fadeIn();this.viewFeelingText()},viewFeelingText:function(){this.displayRecordType("text");$("#log_feeling_value").jkey("space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0",function(e){Lightbox.printUserMessage("Enter only a single word (no spaces or numbers)")});$("#log_feeling_value").jkey("enter",function(e){Backbone.history.navigate("#/record/experience",!0)})},viewFeelingEmoticons:function(){this.displayRecordType("emoticons");$(".emoticon_item").live("mouseover",function(){$(this).css("background-color","#d6d6d6")}).live("mouseleave",function(){$(this).css("background-color","")})},viewFeelingAudio:function(){this.displayRecordType("audio")},processFeelingText:function(){$.validator({elements:[{selector:"#log_feeling_value",rule:"require",field:"Feeling"}],message:"Enter a ",success:function(){LogFeelingModel.processFeeling($("#log_feeling_value").val());Backbone.history.navigate("#/record/experience",!0)},failed:function(){Lightbox.printUserMessage("Please enter how you feel right now")}})},processFeelingEmoticons:function(e){LogFeelingModel.processFeeling($(e.target).data("feeling"));Backbone.history.navigate("#/record/experience",!0)},processFeeling:function(e){e.preventDefault();$.validator({elements:[{selector:"#log_feeling_value",rule:"require",field:"Experience"}],message:"Enter a ",success:function(){$.oauthAjax({oauth:UserData,url:base_url+"api/emoome/logs/create_feeling",type:"POST",dataType:"json",data:LogFeelingModel.returnData(),beforeSend:Lightbox.requestMade("Saving your feeling"),success:function(e){Lightbox.requestComplete(e.message,e.status);if(e.status==="success"){$("#log_completion_message").html(_.shuffle(UIMessages.log_feeling_complete)[0]);Backbone.history.navigate("#/record/thanks",!0)}}})},failed:function(){Lightbox.printUserMessage("Please enter how you feel right now")}})},viewExperience:function(){var e=_.template($("#record_experience").html());this.$el.html(e).hide().delay(250).fadeIn()},processExperience:function(){$.validator({elements:[{selector:"#log_experience_value",rule:"require",field:"Experience"}],message:"Enter a ",success:function(){LogFeelingModel.processExperience();Backbone.history.navigate("#/record/describe",!0)},failed:function(){Lightbox.printUserMessage("Please enter one thing you did today")}})},viewDescribe:function(){var e={describe_this:LogFeelingModel.get("experience")},t=_.template($("#record_describe").html(),e);this.$el.html(t).hide().delay(250).fadeIn();$("#log_describe_1_value, #log_describe_2_value, #log_describe_3_value").jkey("space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0",function(){Lightbox.printUserMessage("Enter only a single word (no spaces or numbers)")})},processDescribe:function(){console.log("inside processDescribe()");$.validator({elements:[{selector:"#log_describe_1_value",rule:"require",field:"Describe 1"},{selector:"#log_describe_2_value",rule:"require",field:"Describe 2"},{selector:"#log_describe_3_value",rule:"require",field:"Describe 3"}],message:"Enter a ",success:function(){LogFeelingModel.processDescribe();$.oauthAjax({oauth:UserData,url:base_url+"api/emoome/logs/create_experience",type:"POST",dataType:"json",data:LogFeelingModel.returnData(),beforeSend:Lightbox.requestMade("Saving your experience"),success:function(e){Lightbox.requestComplete(e.message,e.status);e.status==="success"&&Backbone.history.navigate("#/record/thanks",!0)}})},failed:function(){Lightbox.printUserMessage("Please enter three words to describe what you did today")}})},viewThanks:function(){this.clearInput();var e={complete_message:_.shuffle(UIMessages.log_feeling_complete)[0]},t=_.template($("#record_thanks").html(),e);this.$el.html(t).hide().delay(250).fadeIn()},clearInput:function(){this.$("#log_val_feeling").val("");this.$("#log_val_experience").val("");this.$("#log_val_describe_1").val("");this.$("#log_val_describe_2").val("");this.$("#log_val_describe_3").val("");this.$("#log_describe_this").html("")}}),SettingsView=Backbone.View.extend({initialize:function(){this.render()},render:function(){},events:{"click #settings_button_notifications":"processNotifications","click #settings_button_account":"processAccount","click #settings_button_password":"processPassword","click .settings_button_cancel":"processCancel"},viewNotifications:function(){var e={describe_this:LogFeelingModel.get("experience")},t=_.template($("#settings_notifications").html(),e);this.$el.html(t).hide().delay(250).fadeIn()},viewAccount:function(){var e=_.template($("#settings_account").html(),UserData.attributes);this.$el.html(e).hide().delay(250).fadeIn()},viewPassword:function(){var e=_.template($("#settings_password").html());this.$el.html(e).hide().delay(250).fadeIn()},processNotifications:function(){var e=$("#settings_notifications").serializeArray();e.push({name:"module",value:"notifications"});$.oauthAjax({oauth:UserData,url:base_url+"api/users/details/id/"+UserData.get("user_id"),type:"POST",dataType:"json",data:e,beforeSend:Lightbox.requestMade("Saving notification settings"),success:function(e){Lightbox.requestComplete(e.message,e.status)}})},processAccount:function(){$.validator({elements:[{selector:"#profile_name",rule:"require",field:"Name is required",action:"label"},{selector:"#profile_email",rule:"email",field:"Email is required",action:"label"}],message:"",success:function(){var e=$("#settings_account").serializeArray();e.push({name:"session",value:1});$.oauthAjax({oauth:UserData,url:base_url+"api/users/modify/id/"+UserData.get("user_id"),type:"POST",dataType:"json",data:e,beforeSend:Lightbox.requestMade("Saving account changes"),success:function(e){Lightbox.requestComplete(e.message,e.status);UserData.set(e.user)}})}})},processPassword:function(){$.validator({elements:[{selector:"#old_password",rule:"required",field:"Old Password is required",action:"label"},{selector:"#new_password",rule:"required",field:"New Password is required",action:"label"},{selector:"#new_password_confirm",rule:"confirm",field:"Needs to match New Password",action:"label"}],message:"",success:function(){$.oauthAjax({oauth:UserData,url:base_url+"api/users/password",type:"POST",dataType:"json",data:$("#settings_change_password").serializeArray(),beforeSend:Lightbox.requestMade("Changing your password"),success:function(e){Lightbox.requestComplete(e.message,e.status);$("#old_password").val("");$("#new_password").val("");$("#new_password_confirm").val("")}})}})},processLogout:function(){$.oauthAjax({oauth:UserData,url:base_url+"api/users/logout",type:"GET",dataType:"json",beforeSend:Lightbox.requestMade("Logging you out..."),success:function(e){Lightbox.closeFast();Backbone.history.navigate("#/logout",!0)}})},processCancel:function(e){e.preventDefault();Backbone.history.navigate("#/settings",!0)}}),VisualizeView=Backbone.View.extend({initialize:function(){this.render()},render:function(){var e={},t=_.template($("#visualize").html(),e);this.$el.html(t).hide().delay(250).fadeIn();if(VisualizeModel.get("logs_count")<5){$("#visualize_logs_needed_count").html(5-VisualizeModel.get("logs_count"));$("#visualize_waiting").fadeIn("slow")}else this.renderLastFive();if(VisualizeModel.get("logs_count")>10){UserData.get("source")!=="mobile"&&$("#your_language_map").fadeIn();this.renderCommonWords()}VisualizeModel.get("logs_count")>15&&this.renderStrongExperiences()},renderLastFive:function(){var e=VisualizeModel.get("last_five").language,t=[],n=[],r=[];if(e.undecided!==undefined)var i=VisualizeModel.get("last_five").language_total-e.undecided;else var i=VisualizeModel.get("last_five").language_total;for(var s in e)if(s!=="undecided"){var o=e[s]/i,o=Math.round(o*100);n.push(e[s]);r.push(o+"% "+s);t.push(EmoomeSettings.type_colors[s])}this.renderPieChart(n,r,t);this.renderMoodTopics();$("#visualize_summary").fadeIn();if(UserData.get("source")!=="mobile"){$("#visualize_navigation_language").show();UserData.get("user_level_id")<=3&&$("#visualize_navigation_search").show()}},renderPieChart:function(e,t,n){var r=EmoomeSettings.visualization_sizes[UserData.get("source")].pie_word_types_container,i=EmoomeSettings.visualization_sizes[UserData.get("source")].pie_word_types,s=i,o=Raphael("visualize_language_pie",r,r);pie=o.piechart(s,s,i,e,{colors:n});var u=new Raphael(document.getElementById("visualize_language_pie_legend"),200,225),a=10,f=8;$.each(t,function(e,t){u.circle(10,a,10).attr({fill:n[e],opacity:1,"stroke-width":1,stroke:"#c3c3c3"});u.text(35,f,t).attr({"text-anchor":"start",color:"#333333","font-family":"'Ralway', 'Helvetica Neue', Helvetica, Arial, Sans-Serif","font-size":18,"line-height":18,"font-weight":100,"letter-spacing":2});a+=50;f+=25})},renderMoodTopics:function(){var e=Math.round(VisualizeModel.get("last_five").sentiment/5);$("#visualize_mood_emoticon").append('<span class="language-map-emoticons emoticons-'+EmoomeSettings.core_emotions[e]+'"></span>');$.each(VisualizeModel.get("last_five").topics,function(e,t){e!=="undecided"&&$("#visualize_mood_topics").append('<div class="topic_container"><div class="icons_topics icons_topics_'+e+'"></div><span class="topic_count">'+t+'</span> <span class="topic_text">'+e+"</span></div>")})},renderCommonWords:function(){$visualize_common_words=$("#visualize_common_words");var e=0,t=VisualizeModel.get("all_time").words;$.each(t,function(t,n){if(e<10)if($("#word_count_"+n).length)$("#word_count_"+n+"_words").append(", "+t);else{$visualize_common_words.append('<div id="word_count_'+n+'" class="common_words">'+'<div class="common_words_count">'+n+"</div>"+'<div id="word_count_'+n+'_words" class="common_words_words">'+t+"</div>"+'<div class="clear"></div>'+"</div>"+'<div class="common_words_line"></div>');e++}});$("#visualize_common").delay(750).fadeIn()},renderStrongExperiences:function(){$strong_experiences=$("#strong_experiences");$.each(VisualizeModel.get("strong_experiences"),function(e,t){var n=EmoomeSettings.type_colors[t.type],r=t.count*EmoomeSettings.visualization_sizes[UserData.get("source")].circle_strong_experiences,i=8*EmoomeSettings.visualization_sizes[UserData.get("source")].circle_strong_experiences,s=i/2;$strong_experiences.append('<div class="strong_experience"><div class="strong_experience_circle" id="strong_experience_'+t.log_id+'"></div><div class="strong_experience_experience">"'+t.experience+'" <span class="strong_experience_date">'+mysqlDateParser(t.date).date("short")+"</span></div>"+'<div class="clear"></div></div>');var o=new Raphael(document.getElementById("strong_experience_"+t.log_id),i,i);o.circle(s,s,r).attr({fill:n,opacity:0,"stroke-width":1,stroke:"#c3c3c3"}).animate({opacity:1},1500)});$("#visualize_experiences").delay(1e3).fadeIn()}}),VisualizeLanguageView=Backbone.View.extend({initialize:function(){this.render()},render:function(){var e=_.template($("#visualize_language_map").html());this.$el.html(e).hide().delay(250).fadeIn()},renderLanguage:function(){var e=0,t=0,n=10,r=40,i={},s={},o={},u=0,a={},f=VisualizeLanguageModel.get("logs"),l=VisualizeLanguageModel.get("words");for(link in l){s[l[link].log_id]===undefined?s[l[link].log_id]=new Array(l[link].type):s[l[link].log_id].push(l[link].type);o[l[link].log_id]===undefined?o[l[link].log_id]=new Array(l[link].sentiment):o[l[link].log_id].push(l[link].sentiment)}for(log in f)i[f[log].log_id]={created_date:f[log].created_date,experience:f[log].experience};for(color in EmoomeSettings.type_colors)if(color!=="U"){var c='<div class="type_swatch"><div class="color_swatch" style="background:'+EmoomeSettings.type_colors[color]+'"></div>'+color+"</div>";$("#user_word_colors").append(c)}for(type in EmoomeSettings.word_types){a[type]=r;r+=100}$word_map_container=$("#user_word_map");var h=-45;$.each(s,function(t,r){e+=40;if(t!=="undefined"){h+=80;if(jQuery.inArray("U",r)<0){$word_map_container.append('<div class="word_map_column" data-experience="'+i[t].experience+'" data-sentiment="'+o[t]+'" data-created_date="'+i[t].created_date+'" id="word_map_column_'+t+'"></div>').width(h);var s=new Raphael(document.getElementById("word_map_column_"+t),80,700);for(type in EmoomeSettings.word_types)if(type!=="U"){var u=EmoomeSettings.word_types[type],f=EmoomeSettings.type_colors[u],l=a[type],c=n*countElementsArray(type,r);c>0&&s.circle(40,l,c).attr({fill:f,opacity:0,"stroke-width":1,stroke:"#c3c3c3"}).animate({opacity:1},1500)}}}});var p=$("#user_word_map").width()+180;$("#user_word_map").width(p);$(".word_map_column").qtip({content:{text:function(e){var t=sentimentFromArray($(this).data("sentiment").split(",")),n='<span class="language-map-emoticons emoticons-small-'+EmoomeSettings.core_emotions[t]+'"></span>';n+='<span class="language-map-experience">'+$(this).data("experience")+" <i>"+mysqlDateParser($(this).data("created_date")).date("short")+"</i></span>";return n}},position:{my:"top left",target:"mouse",viewport:$(window),adjust:{x:10,y:10}},hide:{fixed:!0},style:{classes:"ui-tooltip-tipsy"}})}});SearchBox=Backbone.View.extend({initialize:function(){this.render()},render:function(){var e={title:"How Do I Feel Between"},t=_.template($("#visualize_search_box").html(),e);this.$el.html(t)},events:{"click #search_button":"doSearch"},doSearch:function(){var e={start_hour:determineHourStart($("#start_time").val(),$("#start_meridian").val()),end_hour:determineHourEnd($("#end_time").val(),$("#end_meridian").val())};this.getHourSearch(e)},getHourSearch:function(e){$("#search_visualization").html("");$.oauthAjax({oauth:UserData,url:base_url+"api/emoome/analyze/time/start/"+e.start_hour+"/end/"+e.end_hour,type:"GET",dataType:"json",success:function(e){if(e.status=="success"){$("#search_visualization_title").html(e.log_count+" entries found during those hours").hide().delay(250).fadeIn();var t=new ResultSearch({el:$("#search_visualization")});t.renderHourSearch(e)}else $("#search_visualization").append('<div id="search_visualization_none">'+e.message+"</div>")}})}});ResultSearch=Backbone.View.extend({initialize:function(){this.render()},render:function(){},renderHourSearch:function(e){$.each(e.moods,function(e,t){console.log(t);if(e!="undefined"){var n=t.topics,r="",i=_.values(t.topics).length;for(var s in n)s!="undecided"&&(i>6&&n[s]>1?r+='<div class="topic_container"><div class="icons_topics icons_topics_'+s+'"></div><span class="topic_count">'+n[s]+'</span> <span class="topic_text">'+s+"</span></div>":i<6&&(r+='<div class="topic_container"><div class="icons_topics icons_topics_'+s+'"></div><span class="topic_count">'+n[s]+'</span> <span class="topic_text">'+s+"</span></div>"));var o={mood:e,emoticon:'<img src="'+base_url+"application/modules/emoome/assets/images/emoticons-"+e+'.png">',log_count:t.log_count,topics:r+'<div class="clear"></div>'},u=_.template($("#search_hour_mood").html(),o);$("#search_visualization").append(u).hide().delay(500).fadeIn();var a=t.language,f=new Array,l=new Array,c=new Array;for(var h in a)if(h!="undecided"){l.push(a[h]);c.push("%% "+h);f.push(EmoomeSettings.type_colors[h])}var p=Raphael("search_mood_language_"+e,190,190);pie=p.piechart(90,90,90,l,{colors:f});$search_mood_words=$("#search_mood_words_"+e);var d=t.words;for(var v in d)if($("#search_words_"+e+"_"+d[v]).length){$search_words_mood_words=$("#search_words_"+e+"_words_"+d[v]);var m=$search_words_mood_words.data("word_count");m=parseInt(m)+1;if(m<=10){$search_words_mood_words.data("word_count",m);$search_words_mood_words.append(", "+v)}}else $search_mood_words.append('<div id="search_words_'+e+"_"+d[v]+'" class="search_words_row">							<div class="search_words_count">'+d[v]+'</div>							<div id="search_words_'+e+"_words_"+d[v]+'" data-word_count="1" class="search_words_words">'+v+'</div>							<div class="clear"></div>						</div>						<div class="search_common_words_line"></div>')}})}});var ApplicationRouter=Backbone.Router.extend({initialize:function(e){this.el=e;this.Navigation=new NavigationView({el:$("#navigation")});this.indexView=new ContentView("#index");this.authView=new AuthView({el:$("#content")});this.logoutView=new ContentView("#logout");this.notFoundView=new ContentView("#not_found");this.recordIndex=new ContentView("#record");this.recordFeeling=new RecordFeelingView({el:$("#content")});this.settingsIndex=new ContentView("#settings");this.settingsViews=new SettingsView({el:$("#content")})},routes:{"":"index",login:"login",signup:"signup",forgot_password:"forgotPassword",logout:"logout","logged/:destination":"logged",record:"recordViews","record/:view":"recordViews",visualize:"visualize",settings:"settingsViews","settings/:view":"settingsViews"},currentView:null,switchView:function(e){this.currentView&&this.currentView.remove();this.el.html(e.el);e.render();this.currentView=e},setActiveNav:function(e){$.each(["record","visualize","settings"],function(e,t){t==type?$("#record_feeling_"+t).fadeIn():$("#record_feeling_"+t).hide()});$("div.left_control_links").removeClass("icon_small_text_on icon_small_emoticons_on icon_small_audio_on");$("#log_feeling_use_"+type).addClass("icon_small_"+type+"_on")},index:function(){UserData.get("logged")==="yes"&&Backbone.history.navigate("#/record/feeling",!0);this.switchView(this.indexView)},login:function(){UserData.get("logged")==="yes"&&Backbone.history.navigate("#/record/feeling",!0);this.authView.viewLogin()},signup:function(){UserData.get("logged")==="yes"&&Backbone.history.navigate("#/record/feeling",!0);this.authView.viewSignup()},forgotPassword:function(){this.authView.viewForgotPassword()},logout:function(){UserData.set({logged:"no",user_id:"",username:"",name:"",user_level_id:"",name:"",image:"",location:"",geo_enabled:"",language:"",privacy:"",consumer_key:"",consumer_secret:"",token:"",token_secret:""});this.Navigation.renderPublic();this.switchView(this.logoutView)},notFound:function(){this.switchView(this.notFoundView)},recordViews:function(e){UserData.get("logged")!=="yes"&&Backbone.history.navigate("#/login",!0);e===undefined?this.switchView(this.recordIndex):e==="feeling"?this.recordFeeling.viewFeeling():e==="experience"?this.recordFeeling.viewExperience():e==="describe"?this.recordFeeling.viewDescribe():e==="thanks"?this.recordFeeling.viewThanks():this.switchView(this.notFoundView)},visualize:function(e){UserData.get("logged")!=="yes"&&Backbone.history.navigate("#/login",!0);VisualizeModel.get("data")!=="updated"?$.oauthAjax({oauth:UserData,url:base_url+"api/emoome/analyze/me",type:"GET",dataType:"json",success:function(e){if(e.status==="success"){VisualizeModel.set(e);VisualizeModel.set({data:"updated"});VisualizeViews=new VisualizeView({el:$("#content")})}else VisualizeViews=new VisualizeView({el:$("#content")})}}):VisualizeViews=new VisualizeView({el:$("#content")})},settingsViews:function(e){UserData.get("logged")!=="yes"&&Backbone.history.navigate("#/login",!0);e===undefined?this.switchView(this.settingsIndex):e==="notifications"?this.settingsViews.viewNotifications():e==="account"?this.settingsViews.viewAccount():e==="password"?this.settingsViews.viewPassword():e==="logout"?this.settingsViews.processLogout():this.switchView(this.notFoundView)}}),VisualizeRouter=Backbone.Router.extend({initialize:function(e){this.el=e},routes:{"visualize/language":"visualizeLanguage","visualize/search":"visualizeSearch"},visualizeLanguage:function(){UserData.get("logged")!=="yes"&&UserData.get("source")==="web"&&Backbone.history.navigate("#/login",!0);VisualizeLanguage=new VisualizeLanguageView({el:$("#content")});VisualizeLanguageModel.get("data")!=="updated"?$.oauthAjax({oauth:UserData,url:base_url+"api/emoome/logs/user/id/"+UserData.get("user_id"),type:"GET",dataType:"json",success:function(e){VisualizeLanguageModel.set(e);VisualizeLanguageModel.set({data:"updated"});VisualizeLanguage.renderLanguage()}}):VisualizeLanguage.renderLanguage()},visualizeSearch:function(){UserData.get("logged")!=="yes"&&UserData.get("source")==="web"&&Backbone.history.navigate("#/login",!0);VisualizeSearch=new SearchBox({el:$("#content")})}});