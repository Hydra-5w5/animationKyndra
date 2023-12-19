<?php
/**
 * Plugin Name: Logo interactif
 * Author: Hydra
 * Author uri: https://github.com/Hydra-5w5/animationKyndra
 * Description: Affiche plusieurs logo se deplacent de gauche a doite qui peuvent explose
 */

function enfiler_script_css_logo() 
{
  $version_css = filemtime(plugin_dir_path(__FILE__) . 'css/style.css');
  $version_js = filemtime(plugin_dir_path(__FILE__) . 'js/script.js');
  wp_enqueue_style('style_logo', plugin_dir_url(__FILE__) . 'css/style.css', array(), $version_css);
  wp_enqueue_script('js_logo', plugin_dir_url(__FILE__) . 'js/script.js', array(), $version_js, true);
}
add_action('wp_enqueue_scripts', 'enfiler_script_css_logo');
