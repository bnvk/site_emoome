<script type="text/template" id="header_public">
	<div id="header_not_logged">
		<div id="header_logo"></div>
		<h1><a id="header_home" href="<?= base_url() ?>#">emo<span class="name_ome">ome</span></a></h1>
		<ul id="header_links_public" class="header_links">
			<li class="header_text">Have<br>Account</li>
			<li><a href="<?= base_url() ?>#/login"><span class="header_icons icon_login"></span>Login</a></li>
			<li class="header_text">Create<br>Account</li>
			<li><a href="<?= base_url() ?>#/signup"><span class="header_icons icon_signup"></span>Signup</a></li>
		</ul>
		<div class="clear"></div>
	</div>	
</script>

<script type="text/template" id="header_user">
	<div id="header_logged">
		<div id="header_logged_user">
			<div id="header_logged_avatar"><img src="<%= image %>"></div>
			<h1 id="header_logged_name"><%= name %></h1>
			<p id="header_logged_count"></p>
			<div class="clear"></div>
		</div>
		<ul id="header_links_logged" class="header_links">	
			<li><a href="<?= base_url() ?>#/record/feeling"><span class="header_icons icon_record"></span>Record</a></li>	
			<li><a href="<?= base_url() ?>#/visualize"><span class="header_icons icon_visualize"></span>Visualize</a></li>	
			<li><a href="<?= base_url() ?>#/settings"><span class="header_icons icon_settings"></span>Settings</a></li>
		</ul>
	</div>
</script>