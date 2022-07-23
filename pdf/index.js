export const pdfHtml = (payments) => {
  const header = `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
      integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body>
    <main class="bg-gray-50 w-5/6 mx-auto py-10 px-2">
      <h2 class="text-xl font-bold">News Report</h2>
      <h3 class="text-sm pt-2 text-gray-500">My Earnings</h3>

      <section class="pt-6">
  `;

  const footer = `
  </section>
  </main>
</body>
</html>
  
  `;

  let body = ``;

  payments.forEach((payment) => {
    console.log(payment);
    body += `
    
    <div class="pt-4">
          <h3>${payment.station.name}</h3>
          <div class="flex justify-between text-sm">
            <h4><span class="capitalize">${payment.currency}</span>&nbsp;<span>${payment.amount}</span></h4>
            <span class="text-xs">${payment.date}</span>
          </div>
        </div>
    
    `;
  });

  return ` ${header}
           ${body}
           ${footer}
         `;
};
