import { FormEvent, useEffect, useState } from "react";
import { postCustomer } from "../services/customerService";
import { testSubmitBooking } from "./BookingPostRoutes/BookingSubmitHandler";

interface CustomerInterface {
  id?: number;
  name: string;
  phone: string;
}

export default function CustomerForm() {
  const [customerIsExisting, setCusomerIsExisting] = useState<boolean>(false);
  const [thisCustomer, setThisCustomer] = useState<CustomerInterface>();
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [cusomersList, setCustomersList] = useState<CustomerInterface[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerFirstName, setCustomerFirstName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  function fetchCustomers() {
    fetch("http://localhost:8080/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomersList(data);
      });
  }

  // Checks if the phone input maches the customer data
  function searchForNumber(event: FormEvent<HTMLInputElement>) {
    const inputNumber = (event.target as HTMLInputElement).value;
    const matchingCustomer = cusomersList.find(
      (customer) => inputNumber === customer.phone
    );
    if (!matchingCustomer) {
      setCusomerIsExisting(false);
      console.log(customerIsExisting);
    } else {
      setCusomerIsExisting(true);
      console.log(customerIsExisting);
      splitNames(matchingCustomer.name);
      setThisCustomer(matchingCustomer);
    }
    setCustomerPhone(inputNumber);
  }

  // splits the customer fullName and inserts it in the name first- and lastname input fields
  function splitNames(fullName: string) {
    const nameArray = fullName.split(" ");
    const firstname = nameArray[0];
    const lastname = nameArray[1];
    setCustomerFirstName(firstname);
    setCustomerLastName(lastname);
  }

  function setFullName(firstname: string, lastname: string) {
    const fullName = firstname + " " + lastname;
    setCustomerName(fullName);
  }

  function confirmUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFullName(customerFirstName, customerLastName);
    setActiveCustomer();
  }

  async function setActiveCustomer() {
    if (customerIsExisting === true) {
      console.log("this is the existing customer id", thisCustomer);
    } else {
      console.log("we need to post a new customer!");
      const newCustomer = {
        name: customerName,
        phone: customerPhone,
      };
      console.log(newCustomer);
      const postResponse = await postCustomer(newCustomer);
      setThisCustomer(postResponse);
    }

    console.log("Test SubmitBookingHandler!");
    testSubmitBooking();
  }

  return (
    <form onSubmit={confirmUser}>
      <label htmlFor="phonenumber">Telefon nr</label>
      <input
        type="text"
        id="phonenumber"
        onInput={searchForNumber}
        value={customerPhone}
        className="bg-black"
      />

      <label htmlFor="customerFirstname">Fornavn</label>
      <input
        type="text"
        id="customerFirstname"
        onChange={(e) => setCustomerFirstName(e.target.value)}
        value={customerFirstName}
        className="bg-black"
      />

      <label htmlFor="customerLastname">Efternavn</label>
      <input
        type="text"
        id="customerLastname"
        onChange={(e) => setCustomerLastName(e.target.value)}
        value={customerLastName}
        className="bg-black"
      />

      <button type="submit">Bekræft</button>
    </form>
  );
}
