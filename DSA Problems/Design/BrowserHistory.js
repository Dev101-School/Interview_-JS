/*
 * @Implementation browserhistory
 * @visit : insert into history
 * @forward : move forward in the history number of steps.
 * @back :  get back in the history number of steps.
 * 
 * 
*/

function BrowserHistory(homepage) {
    this.history=[homepage];
    this.currIdx=0;
    this.endIdx=0;
}

BrowserHistory.prototype.visit=function(url){
    if(this.history[this.currIdx]!==url){
        this.currIdx++;
        this.history[this.currIdx]=url;
        this.endIdx=this.currIdx
    }
}

BrowserHistory.prototype.back=function(step){
    this.currIdx=Math.min(this.endIdx, this.currIdx+step);
    return this.history[this.currIdx];
}

BrowserHistory.prototype.forward=function(step){
    this.currIdx=Math.max(0,this.currIdx-step);
    return this.history[this.currIdx];
}


let browserHistory = new BrowserHistory("leetcode.com");
browserHistory.visit("google.com");       // You are in "leetcode.com". Visit "google.com"
browserHistory.visit("facebook.com");     // You are in "google.com". Visit "facebook.com"
browserHistory.visit("youtube.com");      // You are in "facebook.com". Visit "youtube.com"
browserHistory.back(1);                   // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
browserHistory.back(1);                   // You are in "facebook.com", move back to "google.com" return "google.com"
browserHistory.forward(1);                // You are in "google.com", move forward to "facebook.com" return "facebook.com"
browserHistory.visit("linkedin.com");     // You are in "facebook.com". Visit "linkedin.com"
browserHistory.forward(2);                // You are in "linkedin.com", you cannot move forward any steps.
browserHistory.back(2);                   // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
browserHistory.back(7);                   // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com"
console.log(browserHistory)
