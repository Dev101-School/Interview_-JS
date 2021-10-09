//876. Middle of the Linked List
var middleNode = function(head) {
    let slow=head;
    let fast=head;
    while(fast && fast.next){
        slow=slow.next;
        fast=fast.next.next;
    }
    return slow;
}

//234. Palindrome Linked List
var isPalindrome = function(head) {
    
};

//21. Merge Two Sorted Lists
var mergeTwoLists = function(l1, l2) {

}

//83. Remove Duplicates from Sorted List
var deleteDuplicates = function(head) {}


//160. Intersection of Two Linked Lists
var getIntersectionNode = function(headA, headB) {}

//141. Linked List Cycle
var hasCycle = function(head) {}