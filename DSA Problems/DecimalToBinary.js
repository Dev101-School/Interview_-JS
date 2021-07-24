/*
Title: 
Decimal To Binary 

Meta-Tags:
Javascript, JS, interview, questions, interview questions, primitive,functions,practice,medium 

Description:
Write a function 'decToBin' which takes a decimal number and returns its binary.

Constraints:
Nil

Sample Input:
45

Sample Output:
101101

Test Cases:
    Input#1:
    86

    Output#1:
    1010110


    Input#2:
    3672

    Output#2:
    111001011000
*/


function DecimalToBinary(nums,base=2) {
    let power=1
    let result=0
    while(nums!=0){
        let rem=Math.floor(nums%base);
        result=result+power*rem;
        nums=Math.floor(nums/base);
        power=power*10;
    }
    return result;
}

const decToBin=(nums)=> nums.toString(2);

console.log(decToBin(3672));
console.log(DecimalToBinary(5,3));