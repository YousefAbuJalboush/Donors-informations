'use strict';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const form = document.getElementById('form');
const tbodyTable = document.getElementById('tbodyTable');
const total = document.getElementById('total');

let totalAmount = 0;

form.addEventListener('submit', getDataFromForm);

function getDataFromForm(event) {
  event.preventDefault();

  const data = event.target;

  const donorName = data.donorName.value;
  const amount = data.amount.value;

  new Donors ( donorName , amount );

  setLocalStorage();

//   console.log(donorName);
}



function Donors ( donorName , amount ) {

  this.donorName = donorName ;
  this.amount = amount ;
  this.age = getRandomArbitrary( 18 , 30);

  Donors.arrObject.push(this);
  this.render();
}
Donors.arrObject = [];



Donors.prototype.render = function () {

  totalAmount += parseInt(this.amount) ;

  const tr = document.createElement('tr');
  tbodyTable.appendChild(tr);

  let td ;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent = this.donorName;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent = this.age;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent = this.amount;

  total.textContent = totalAmount ;
};

function setLocalStorage() {
  let arr = JSON.stringify(Donors.arrObject);
  localStorage.setItem( 'DonorsStorage' , arr );
}

function getLocalStorage() {
  let arr = localStorage.getItem('DonorsStorage');
  let obj = JSON.parse(arr);

  if ( obj !== null) {
    for (let i = 0; i < obj.length; i++) {
      new Donors ( obj[i].donorName , obj[i].amount );
    }
  }
}
getLocalStorage();
