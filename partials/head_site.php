<title><?= $site_title ?></title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="title" content="<?= site_title($sub_title, $page_title, $site_title) ?>" />
<meta name="description" content="<?= $site_description ?>" />
<meta name="keywords" content="<?= $site_keywords ?>" />
<meta name="author" content="Brennan Novak">

<!-- OpenGraph (Facebook) http://ogp.me -->
<meta property="og:title" content="<?= $site_title ?>"/>
<meta property="og:type" content="website" />
<meta property="og:image" content="<?= $site_assets ?>apple-touch-icon-114x114-precomposed.png"/>
<meta property="og:url" content="<?= current_url() ?>"/>
<meta property="og:site_name" content="<?= $site_title ?>"/>
<meta property="og:description" content="<?= $site_description ?>">

<!-- Mobile Scale Things -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- CSS Style -->
<link rel="stylesheet" media="screen" href="<?= $site_assets ?>css/style.css?<?= now() ?>" type="text/css" />

<!-- Apple Icons -->
<link rel="apple-touch-icon-precomposed" href="<?= $site_assets ?>icons/apple-touch-icon-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?= $site_assets ?>icons/apple-touch-icon-57x57-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?= $site_assets ?>icons/apple-touch-icon-72x72-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?= $site_assets ?>icons/apple-touch-icon-114x114-precomposed.png" />
<link rel="apple-touch-startup-image" href="<?= $site_assets ?>images/app-startup-320.png">

<!-- Favicon -->
<link rel="shortcut icon" href="<?= $site_assets ?>icons/favicon.ico" />
<link rel="icon" type="image/png" href="<?= $site_assets ?>icons/icon-32.png" />
