
const from = "no-reply@morfiya.nomnom";

export const Translations = {
  en: {
    sale: {
      from: from,
      subject: "Morfi Ya: Congratulations, you have new orders!",
      deliveryText: (...args) => {
        return `Someone just bought ${args[0]} from you! \n\n
        Here is a summary of the order: \n\n
        @ ${args[1]} units of ${args[2]} \n
        @ Price: ${args[3]} \n
        @ Delivery Price: ${args[4]} \n
        @ Total: ${args[5]} \n
        @ Should be delivered in: ${args[6]} hrs. \n`
      },
      pickUpText: (...args) => {
        return `Someone just bought ${args[0]} from you! \n\n
        Here is a summary of the order: \n\n
        @ ${args[1]} units of ${args[2]} \n
        @ Price: ${args[3]} \n
        @ Delivery Price: ${args[4]} \n
        @ Total: ${args[5]} \n
        @ Delivery will be picked up in ${args[6]} hrs. \n`
      },
    },
    purchase: {
      from: from,
      subject: "Morfi Ya: Your order summary is ready",
      deliveryText: (...args) => {
        return `Thank you for purchasing ${args[0]}.\n
        We hope you enjoy your meal. Here is a summary of your order: \n\n
        @ ${args[1]} units of ${args[2]} \n
        @ Price: ${args[3]} \n
        @ Delivery Price: ${args[4]} \n
        @ Total: ${args[5]} \n
        @ Estimated delivery time: ${args[6]} hrs. \n
        \n
        Don't forget to rate the buyer, let the community know your experience ;)`
      },
      pickUpText: (...args) => {
        return `Thank you for purchasing ${args[0]}.\n
        We hope you enjoy your meal. Here is a summary of your order: \n\n
        @ ${args[1]} units of ${args[2]} \n
        @ Price: ${args[3]} \n
        @ Delivery Price: ${args[4]} \n
        @ Total: ${args[5]} \n
        @ Your order will be ready to pick up in ${args[6]} hrs. \n
        \n
        Don't forget to rate the buyer, let the community know your experience ;)`
      }
    }
  },
  es: {
    sale: {
      from: from,
      subject: "¡Felicitaciones, tenés nuevas órdenes!",
    },
    purchase: {
      from: from,
      subject: "Morfi Ya: Resumen de tu compra",
      text: (...args) => {
        return `Congratulations for your purchase`
      }
    }
  }
}