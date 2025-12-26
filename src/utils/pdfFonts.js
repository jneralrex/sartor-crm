import { jsPDF } from "jspdf"
import NotoSans from "./NotoSans-Regular.base64"

var callAddFont = function () {
this.addFileToVFS('NotoSans-Regular-normal.ttf', NotoSans);
this.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
