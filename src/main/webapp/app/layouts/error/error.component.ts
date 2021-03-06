import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'jhi-error',
    templateUrl: './error.component.html',
    styles: [`
    .error { background-color: #f1f1f1; height: 100% }
    input, button {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .container { margin: 30px auto 40px auto; width: 100%; text-align: center; }
    a { color: #4183c4; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
    h3 { color: #666; }
    ul { list-style: none; padding: 25px 0; }
    li {
        display: inline;
        margin: 10px 50px 10px 0px;
    }
    input[type=text],
    input[type=password] {
        font-size: 13px;
        min-height: 32px;
        margin: 0;
        padding: 7px 8px;
        outline: none;
        color: #333;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: right center;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: all 0.15s ease-in;
        transition: all 0.15s ease-in;
        vertical-align: middle;
    }
    .btn {
        position: relative;
        display: inline-block;
        padding: 6px 12px;
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        color: #333;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        background-color: #EEE;
        background-image: -webkit-linear-gradient(#FCFCFC, #EEE);
        background-image: linear-gradient(#FCFCFC, #EEE);
        background-repeat: repeat-x;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        user-select: none;
        -webkit-appearance: none;
    }

    .btn:focus,
    input[type=text]:focus,
    input[type=password]:focus {
        text-decoration: none;
        border-color: #51a7e8;
        outline: none;
        box-shadow: 0 0 5px rgba(81, 167, 232, 0.5);
    }

    .btn:hover,
    .btn:active {
        text-decoration: none;
        background-color: #ddd;
        background-image: -webkit-linear-gradient(#eee, #ddd);
        background-image: linear-gradient(#eee, #ddd);
        background-repeat: repeat-x;
        border-color: #ccc;
    }

    .btn:active {
        background-color: #dcdcdc;
        background-image: none;
        border-color: #b5b5b5;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    #auth {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 50;
        min-height: 32px;
        background-color: rgba(53,95,120,.4);
        padding: 7px 10px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        box-shadow: 0 3px 0 rgba(0, 0, 0, 0.28);
        display: none;
    }
    #auth h1, #auth p, #auth label {
        display: none;
    }
    .auth-form-body {
        display: inline;
    }
    #auth input[type=text],
    #auth input[type=password] {
        float: left;
        width: 175px;
        margin-right: 9px;
        border: 0;
        background-color: #f5f5f5;
    }
    #auth input[type=text]:focus,
    #auth input[type=password]:focus {
        background-color: #fff;
        box-shadow: 0 0 5px rgba(255,255,255,.5);
    }
    #auth .btn {
        border: 0;
    }
    #auth .btn:focus {
        box-shadow: 0 0 5px rgba(255,255,255,.5);
    }
    label[for=search] {
        display: block;
        text-align: left;
    }
    #search label {
        font-weight: 200;
        padding: 5px 0;
    }
    #search input[type=text] {
        font-size: 18px;
        width: 705px;
    }
    #search .btn {
        padding: 10px;
        width: 90px;
    }
    .logo { display: inline-block; margin-top: 35px; }
    .logo-img { display: none; }
    @media
      only screen and (-webkit-min-device-pixel-ratio: 2),
      only screen and (   min--moz-device-pixel-ratio: 2),
      only screen and (     -o-min-device-pixel-ratio: 2/1),
      only screen and (        min-device-pixel-ratio: 2),
      only screen and (                min-resolution: 192dpi),
      only screen and (                min-resolution: 2dppx) {
        .logo-img { display: inline-block; }
    }
    #suggestions {
        margin-top: 35px;
        color: #ccc;
    }
    #suggestions a {
        color: #666666;
        font-weight: 200;
        font-size: 14px;
        margin: 0 10px;
    }

    #parallax_wrapper {
        position: relative;
        z-index: 0;
        -webkit-transition: all 0.25s ease-in;
        transition: all 0.25s ease-in;
    }
    #parallax_field {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        height: 370px;
        width: 100%;
    }
    #parallax_field #parallax_bg {
        position: absolute;
        top: -20px;
        left: -20px;
        width: 110%;
        height: 425px;
        z-index: 1;
    }
    #parallax_illustration {
        display: block;
        margin: 0 auto;
        width: 940px;
        height: 370px;
        position: relative;
        overflow: hidden;
        clear: both;
    }
    #parallax_illustration img {
        position: absolute;
    }
    #parallax_illustration #parallax_error_text {
        top: 72px;
        left: 72px;
        z-index: 10;
    }
    #parallax_illustration #parallax_octocat {
        top: 94px;
        left: 356px;
        z-index: 9;
    }
    #parallax_illustration #parallax_speeder {
        top: 150px;
        left: 432px;
        z-index: 8;
    }
    #parallax_illustration #parallax_octocatshadow {
        top: 297px;
        left: 371px;
        z-index: 7;
    }
    #parallax_illustration #parallax_speedershadow {
        top: 263px;
        left: 442px;
        z-index: 6;
    }
    #parallax_illustration #parallax_building_1 {
        top: 73px;
        left: 467px;
        z-index: 5;
    }
    #parallax_illustration #parallax_building_2 {
        top: 113px;
        left: 762px;
        z-index: 4;
    }
    `]
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;

    constructor(
        private jhiLanguageService: JhiLanguageService
    ) {
        this.jhiLanguageService.setLocations(['error']);
    }

    ngOnInit() {
    }
}
