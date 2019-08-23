<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
	.fadeMain-enter-active, .fade-leave-active {
		transition: opacity 1s;
	}
	.fadeMain-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	#app {
		width: 100%;
    background-color: #F1F9FF;
    height: 100%;
	}
	.switchcustom {
		margin-top: -10px;
	}
	.switch {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 100px;
    height: 30px;
    padding: 3px;
    margin: 0 10px 10px 0;
    background: linear-gradient(to bottom, #eeeeee, #FFFFFF 25px);
    background-image: -webkit-linear-gradient(top, #eeeeee, #FFFFFF 25px);
    border-radius: 18px;
    box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    box-sizing: content-box;
	}
	label {
		font-weight: inherit;
	}
	input[type=checkbox], input[type=radio] {
    margin: 4px 0 0;
    line-height: normal;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
	}
	.switch-input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    box-sizing: content-box;
	}
	.switch-left-right .switch-input:checked ~ .switch-label {
		background: inherit;
	}
	.switch-input:checked ~ .switch-label {
    background: #E1B42B;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);
	}
	.switch-left-right .switch-label {
		overflow: hidden;
	}
	.switch-label, .switch-handle {
    transition: All 0.3s ease;
    -webkit-transition: All 0.3s ease;
    -moz-transition: All 0.3s ease;
    -o-transition: All 0.3s ease;
	}
	.switch-label {
    position: relative;
    display: block;
    height: inherit;
    font-size: 10px;
    text-transform: uppercase;
    background: #eceeef;
    border-radius: inherit;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
    box-sizing: content-box;
	}
	.switch-left-right .switch-input:checked ~ .switch-label:before {
		opacity: 1;
    left: 100px;
	}
	.switch-input:checked ~ .switch-label:before {
		opacity: 0;
	}
	.switch-left-right .switch-label:before {
    background: #eceeef;
    text-align: left;
    padding-left: 80px!important;
	}
	.switch-left-right .switch-label:before, .switch-left-right .switch-label:after {
    width: 20px;
    height: 20px;
    top: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 11px 0 0 0;
    text-indent: -12px;
    border-radius: 20px;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2), inset 0 0 3px rgba(0, 0, 0, 0.1);
	}
	.switch-label:before {
    content: attr(data-off);
    right: 11px;
    color: #aaaaaa;
    text-shadow: 0 1px rgba(255, 255, 255, 0.5);
	}
	span.switch-label:after {
    content: attr(data-on);
    left: 11px;
    color: #FFFFFF;
    text-shadow: 0 1px rgba(0, 0, 0, 0.2);
    position: absolute;
	}
	.switch-label:before, .switch-label:after {
    position: absolute;
    top: 50%;
    margin-top: -5px;
    line-height: 1;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    -o-transition: inherit;
    transition: inherit;
    box-sizing: content-box;
	}
	.switch-left-right .switch-input:checked ~ .switch-label:after {
    left: 0!important;
    opacity: 1;
    padding-left: 20px;
	}
	.switch-input:checked ~ .switch-label:after {
		opacity: 1;
	}
	.switch-left-right .switch-label:after {
    text-align: left;
    text-indent: 9px;
    background: #2699FB!important;
    left: -100px!important;
    opacity: 1;
    width: 100%!important;
	}
	.switch-left-right .switch-label:before, .switch-left-right .switch-label:after {
    width: 20px;
    height: 20px;
    top: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 11px 0 0 0;
    text-indent: -12px;
    border-radius: 20px;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2), inset 0 0 3px rgba(0, 0, 0, 0.1);
	}
	.switch-input:checked ~ .switch-handle {
    left: 74px;
    box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
	}
	.switch-label, .switch-handle {
    transition: All 0.3s ease;
    -webkit-transition: All 0.3s ease;
    -moz-transition: All 0.3s ease;
    -o-transition: All 0.3s ease;
	}
	.switch-handle {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 28px;
    height: 28px;
    background: linear-gradient(to bottom, #FFFFFF 40%, #f0f0f0);
    background-image: -webkit-linear-gradient(top, #FFFFFF 40%, #f0f0f0);
    border-radius: 100%;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
	}
	.switch-handle:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -6px 0 0 -6px;
    width: 12px;
    height: 12px;
    background: linear-gradient(to bottom, #eeeeee, #FFFFFF);
    background-image: -webkit-linear-gradient(top, #eeeeee, #FFFFFF);
    border-radius: 6px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
	}
  .style-1::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  .style-1::-webkit-scrollbar{
    width: 12px;
    background-color: #F5F5F5;
  }
  .style-1::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #BCE0FD
  }
  .style-2::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  .style-2::-webkit-scrollbar{
    width: 6px;
    background-color: #F5F5F5;
  }
  .style-2::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #BCE0FD
  }
  .style-27::-moz-range-track{
    border-radius: 10px;
    background-color: #F5F5F5 !important;
  }
  .style-27::-moz-progress-bar{
    width: 6px;
    background-color: #F5F5F5 !important;
  }
  .style-27::-moz-range-thumb{
    border-radius: 10px;
    background-color: #BCE0FD !important;
  }
  .cstmTextDate {
    border-radius: 0 !important;
    border-color: #BCE0FD !important;
    height: 50px !important;
    font-size: 14px;
    color: #2699FB;
    width: 100%;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #92CCFD !important;
    opacity: 1; /* Firefox */
  }
  .form-controlCustom {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #2699FB;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  }
  #agentAdd {
    width: 100%;
    color: #2699FB;
  }
  .check {
    cursor: pointer;
    position: relative;
    margin: auto;
    width: 18px;
    height: 18px;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);
  }
  .check:before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(34,50,84,0.03);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .check svg {
    position: relative;
    z-index: 1;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #BCE0FD;
    stroke-width: 1.5;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
  }
  .check svg path {
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
  }
  .check svg polyline {
    stroke-dasharray: 22;
    stroke-dashoffset: 66;
  }
  .check:hover svg {
    stroke: #2699FB;
  }
  polyline:hover {
    stroke: #2699FB;
  }
  .boxbox {
    height: 30px;
    width: 30px;
  }
  .cbx:checked + .check svg {
    stroke: #BCE0FD;
    height: 30px;
    width: 30px;
  }
  .cbx:checked + .check svg path {
    stroke-dashoffset: 60;
    transition: all 0.3s linear;
  }
  .cbx:checked + .check svg polyline {
    stroke-dashoffset: 42;
    transition: all 0.2s linear;
    transition-delay: 0.15s;
  }
  .cboxLabel {
    margin-left: 20px;
    font-size: 14px;
  }
  .disabledBoxbox {
    background-color: #fafafa !important;
    stroke: #E9ECEF !important;
  }
  body .radio {
    margin: 0.5rem;
    margin-left: 0;
  }
  body .radio input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
  body .radio input[type="radio"] + .radio-label:before {
    content: "";
    background: #FFFFFF;
    border-radius: 100%;
    border: 1px solid #BCE0FD;
    display: inline-block;
    width: 1.7em;
    height: 1.7em;
    position: relative;
    top: -0.2em;
    margin-right: 1em;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
  }
  body .radio input[type="radio"]:checked + .radio-label:before {
    background-color: #BCE0FD;
    box-shadow: inset 0 0 0 4px #FFFFFF;
  }
  body .radio input[type="radio"]:focus + .radio-label:before {
    outline: none;
    border-color: #BCE0FD;
  }
  body .radio input[type="radio"]:disabled + .radio-label:before {
    box-shadow: inset 0 0 0 4px #FFFFFF;
    border-color: #b4b4b4;
    background: #b4b4b4;
  }
  body .radio input[type="radio"] + .radio-label:empty:before {
    margin-right: 0;
  }

  .radio {
    margin: 0.5rem;
  }
  .radio input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
  .radio input[type="radio"] + .radio-label:before {
    content: '';
    background: white;
    border-radius: 100%;
    border: 1px solid #2699FB;
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    position: relative;
    top: -0.2em;
    margin-right: 1em;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
  }
  .radio input[type="radio"]:checked + .radio-label:before {
    background-color: #3197EE;
    box-shadow: inset 0 0 0 4px #f4f4f4;
  }
  .radio input[type="radio"]:focus + .radio-label:before {
    outline: none;
    border-color: #3197EE !important;
    background-color: #3197EE !important;
  }
  .radio input[type="radio"]:disabled + .radio-label:before {
    box-shadow: inset 0 0 0 4px #f4f4f4;
    border-color: #b4b4b4;
    background: #b4b4b4;
  }
  .radio input[type="radio"] + .radio-label:empty:before {
    margin-right: 0;
    color: white !important;
  }
  .inlineDisplay {
    display: inline-block;
  }
  #emberloader {
    position: fixed;
    z-index: 100000001 !important;
    height: 2em;
    width: 2em;
    overflow: hidden;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #F7F7F7;
  }
  .primary-color {
    color: #2699FB;
  }
  .clickable {
    cursor: pointer;
  }
  .has-error {
    border-color: #dc3545 !important;
    box-shadow: none !important;
  }
  .cstmHgth {
    height: 50px !important;
  }
  .autocomplete-items {
    position: relative;
    border: 1px solid #BCE0FD;
    border-top: none;
    background-color: #fff;
    color: #2699FC;
    z-index: 99;
    right: 0;
    float: right;
    width: 100%;
    padding: 5px;
    cursor: pointer;
  }
  .autocomplete-items:hover {
    background-color: #6EBBFC;
    color: white;
  }
  .addOnKeyPress {
    background-color: #6EBBFC;
    color: white;
  }
  @media (min-width: 1px) {
    #myContent {
      margin-top: 4em !important;
    }
    .myContent {
      margin-top: 4em !important;
    }
  }
  @media (min-width: 42em) {
    #myContent {
      margin-top: 0 !important;
    }
    .myContent {
      margin-top: 0 !important;
    }
  }
  nav {
    overflow: hidden !important;
  }
  nav:hover {
    overflow-y: scroll !important;
  }
</style>
