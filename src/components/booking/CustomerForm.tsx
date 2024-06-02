import { FormEvent, useEffect, useState } from "react";
import { postCustomer } from "../services/customerService";
import SuccessMessage from "../toasters/SuccesToaster";

export interface CustomerInterface {
  id?: number;
  name: string;
  phone: string;
}

export default function CustomerForm({ setThisCustomer }: { setThisCustomer: (customer: CustomerInterface) => void }) {
  const [customerIsExisting, setCusomerIsExisting] = useState<boolean>(false);
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customersList, setCustomersList] = useState<CustomerInterface[]>([]);
  const [customerFirstName, setCustomerFirstName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");

  const fullName = customerFirstName + " " + customerLastName;

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
    const matchingCustomer = customersList.find((customer) => inputNumber === customer.phone);
    if (!matchingCustomer) {
      setCusomerIsExisting(false);
      // console.log(customerIsExisting);
    } else {
      setCusomerIsExisting(true);
      // console.log(customerIsExisting);
      splitNames(matchingCustomer.name);
      setThisCustomer(matchingCustomer);
      console.log(matchingCustomer);
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

  function confirmUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveCustomer();
  }

  async function setActiveCustomer() {
    if (customerIsExisting === true) {
      // console.log("this is the existing customer id", thisCustomer);
    } else {
      console.log("we need to post a new customer!");
      const newCustomer = {
        name: fullName,
        phone: customerPhone,
      };
      console.log(newCustomer);
      const postResponse = await postCustomer(newCustomer);
      console.log("this is the customer: ", postResponse);

      setThisCustomer(postResponse);
      SuccessMessage({ messageString: "Du er nu oprettet som kunde" });
    }

    // console.log("Test SubmitBookingHandler!");
    // testSubmitBooking();
  }

  return (
    <form onSubmit={confirmUser} className="space-y-4 mb-8">
      <div className="flex flex-col">
        <label htmlFor="phonenumber">Telefon nr</label>
        <input type="text" id="phonenumber" onInput={searchForNumber} value={customerPhone} className="w-32 bg-black text-white mx-0" placeholder="Telefon nr" required />
      </div>

      <div className="grid grid-cols-2 ">
        <div>
          <label htmlFor="customerFirstname">Fornavn</label>
          <input type="text" id="customerFirstname" onChange={(e) => setCustomerFirstName(e.target.value)} value={customerFirstName} className="bg-black text-white ml-0" placeholder="Fornavn" required />
        </div>
        <div>
          <label htmlFor="customerLastname">Efternavn</label>
          <input type="text" id="customerLastname" onChange={(e) => setCustomerLastName(e.target.value)} value={customerLastName} className="bg-black text-white ml-0" placeholder="Efternavn" />
        </div>
      </div>
        <div className="flex items-center justify-between">
    <div className="flex space-x-4">
      <button
        className="w-52 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
        type="submit"
      >
        Bekræft Oplysninger
      </button>
    </div>
    </div>
    </form>
  );

}
