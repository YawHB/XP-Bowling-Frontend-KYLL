import { useEffect, useState } from "react";

interface CustomerInterface {
  id?: number;
  name: string;
  phone: string;
}

export default function CustomerForm() {
  //const [customerPhone, setCustomerName] = useState<string>("00000000");
  const [cusomersList, setCustomersList] = useState<CustomerInterface[]>([]);
  //const [customerName, setCustomerName] = useState<string>("firstname lastname");

  // fetch all those damn users!

  // have a function that looks it.
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8080/customers");
        const data = await response.json();
        console.log("This is all the customer data: ", data);
        setCustomersList(data);
      } catch (error) {
        console.error("Error fetching data when creating show", error);
      }
    };
    fetchCustomers();
  }, []);

  function searchForNumber() {
    console.log("here we get the number input and searches for it!");
    console.log(cusomersList);
  }

  // function setFullName(){}

  return (
    <form>
      <label htmlFor="phonenumber">Telefon nr</label>
      <input type="text" id="phonenumber" onInput={searchForNumber} />

      <label htmlFor="customerFirstname">Fornavn</label>
      <input type="text" id="customerFirstname" />

      <label htmlFor="customerLastname">Efternavn</label>
      <input type="text" id="customerLastname" />

      <button> Bekræfr</button>
    </form>
  );
}
