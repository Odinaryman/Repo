<?php 
/*
//require_once('rear/Database_Connect.php');

$query = mysql_query("select id from link where title='news'",$link) or die(mysql_error($link));
$count =0;
while($row=mysql_fetch_array($query,MYSQL_ASSOC))
{
	$id = $row["id"]; 
	$sql = mysql_query("select id, title, picref, DATE_FORMAT(date,'%D %b, %Y') as date from link where parent='$id' order by id desc",$link) or die(mysql_error($link));
	while($rw=mysql_fetch_array($sql,MYSQL_ASSOC))
	{
		$ids[] = $rw["id"];
		$picref[] = $rw["picref"];
		$title[] = $rw["title"];
		$date[] = $rw["date"];
		$count++;
	}
}

/*$query = mysql_query("select id from link where title='about'",$link) or die(mysql_error($link));
$count =0;
if($row=mysql_fetch_array($query,MYSQL_ASSOC))
{
	$id = $row["id"]; 
	$sql = mysql_query("select id, title, body, picref from link where parent='$id'",$link) or die(mysql_error($link));
	while($rw=mysql_fetch_array($sql,MYSQL_ASSOC))
	{
		$abt_id = $rw["id"];
		$abt_picref = $rw["picref"];
		$abt_title = $rw["title"];
		$abt_body = $rw["body"];
	}
}*/
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to Divine Love Extension Secondary School</title>
<link href="index.css" rel="stylesheet" type="text/css" />
<link href="mq.css" rel="stylesheet" type="text/css" />
<link href="materialize/css/materialize.css" rel="stylesheet" type="text/css" media="screen,projection"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script type="text/javascript" src="jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="materialize/js/materialize.js"></script>
<script type="text/javascript" src="nav.js" language="javascript"></script>
<script type="text/javascript" language="javascript" src="class.js"></script>
</head>
<body>
<?php  require_once('header.php'); ?>
<div class="hd2_lyt slider" id="nav">
	<!--<div class="c_bn"><div class="bn"><div id="jssor_slider_container" class="slider1" style="position: relative; width: 1000px;
        height: 430px;">

        <!-- Loading Screen -->
        <!--<div u="loading" style="position: absolute; top: 0px; left: 0px;">
            <div style="filter: alpha(opacity=70); opacity=0.7; position: absolute; display: block;
                background-color: #000000; top: 0px; left: 0px;width: 100%;height:100%;">
            </div>
        </div>

        <!-- Slides Container -->
        <!--<div u="slides" style="position: absolute; left: 0px; top: 0px; width: 1000px; height: 430px; overflow: hidden;">
              <div>
                <img u="image" src="image/pic16.png" width="100%">
            </div>
              <div>
                <img u="image" src="image/pic21.jpg" width="100%">
            </div>
       </div>
        <!-- Navigator Skin Begin -->
        <!-- Navigator Skin End -->
        <!-- Trigger -->
        <!--<script>
            jssor_slider_starter('jssor_slider_container');
        </script>
    </div></div>-->
    <ul class="slides slht bod">
      <li>
        <img class="img pos" src="image/1.jpg">
      </li>
      <li>
        <img class="img pos" src="image/2.jpg">
      </li>
      <li>
        <img class="img pos" src="image/3.jpg">
      </li>
       <li>
        <img class="img pos" src="image/5.jpg">
      </li>
      <li>
        <img class="img pos" src="image/6.jpg">
      </li>
      <li>
        <img class="img pos" src="image/10.jpg">
      </li>
      </ul>
    </div>
  <div class="hd_lyt">
	<div class="abt">
		<h2 class="tp_abt"><img src="image/lnw.png" />Know About Us</h2>
        <div class="divider red lighten-3" style="width:100%"></div>
		<div class="bt_abt"><div class="abt_cnt">You are most welcome to Divine Love Extension Secondary school Web site. DLESS is a co-educational institution that came into existence through a divine injunction to foster excellence in character and learning. A citadel of learning open to students of all ethnic origins willing to cope with the academic, moral, cultural and other positive demands of the school. Hence, the school is aimed at inculcating in the students high level of discipline, ethical and spiritual values that will enable them become desirable members of the society as well as future leaders who will be worthy instruments to be used by God to around the present generation for good.</div><div class="abt_img"><img src="image/10.png" /></div></div>
	</div>	
	<div class="hd_fac">
		<h2 class="tp_abt"><img src="image/fc.png" />Our Facilities</h2>
        <div class="divider red lighten-3" style="width:100%"></div>
        <div style="padding-top:4%">
		<div class="fpic"><img src="image/7.jpg" /></div>
        <div class="fpic"><img src="image/8.jpg" /></div>
        <div class="fpic"><img src="image/1.jpg" /></div>
        </div>
        <div class="divider red lighten-3" style="width:100%"></div>
		<!--<div class="fpic"><img src="image/bio.jpg" /><div class="ft">Biology Lab</div></div>-->
	</div>	
	<!--<div class="nws">
	<h2 class="tp_nws"><img src="image/nws.png" />Latest News</h2>
	<div class="bt_nws">
		<?php /*for($i=0;$i<$count;$i++){?><a href="news_detail.php?id=<?php echo $ids[$i]; ?>" class="nws_bd">
		<div class="nws_pic"><img src="<?php echo 'rear/'.$picref[$i]; ?>" /></div>
		<div class="hd_tt">
		<div class="nws_tt"><?php echo $title[$i]; ?></div>
		<div class="nw_dt"><?php echo $date[$i]; ?></div>
		</div>
		</a><?php }*/?>
	</div>
	</div>-->
	
	<!--<div class="hd_fac">
		<h2 class="tp_abt"><img src="image/act.png" />Our Activities</h2>
		<div class="fpic"><img src="image/pic9.jpg" /></div>
		<div class="fpic"><img src="image/pic5.jpg" /></div>
		<div class="fpic"><img src="image/pic14.jpg" /></div>
		<!--<div class="fpic"><img src="image/jet.jpg" /><div class="ft">Jet Club</div></div>-->
	</div>
</div>
</div>
<?php require_once('footer.php'); ?>

</body>
</html>
