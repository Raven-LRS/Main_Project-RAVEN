import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
console.log('currProvider');

console.log(web3);

console.log('currProvider', web3);

export default web3;

