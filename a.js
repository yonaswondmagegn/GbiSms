const generateRandomPhoneNumber = () => {
    const randomNumber = () => Math.floor(Math.random() * 10);
    return `+1${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`;
  };
  
  const generateRandomPhoneNumbers = (count) => {
    const phoneNumbers = [];
    for (let i = 0; i < count; i++) {
      phoneNumbers.push(generateRandomPhoneNumber());
    }
    return phoneNumbers;
  };
  
  const randomPhoneNumbers = generateRandomPhoneNumbers(100);
  console.log(randomPhoneNumbers);
  