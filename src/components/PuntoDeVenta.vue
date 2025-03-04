<template>
    <div class="tip-calculator">
      <header class="header">
        <h1 title>Pago de Propinas</h1>
        <h2 class="cash">Efectivo en Caja ${{ updatedCashAvailable }}</h2>
    </header>
  
        <div class="body">

            <div class="flex-vertical-container">

                <div class="left">
                    <div class="horizontal-cointainer">
                        <div class="total-tips">   
                            <label for="numberInput">Total de propinas</label>
                            <input class = "cash"
                            type="number" 
                            id="numberInput" 
                            v-model.number="totalTips" 
                            min="0" 
                            max="10000" 
                            step="10" 
                            />
                        </div>
                    </div>
                    <div class="horizontal-cointainer">
                        <div class="dividing-tips">
                            <label for="numberInput">¿Entre cuántos empleados quieres dividir las Propinas?</label>
                            <input type="number" id="numberInput" value="1" min="1" max="200" step="1" 
                                v-model.number="peopleCount"
                            />
                            <p class ="orange-letters">${{ (totalTips / peopleCount).toFixed(2) }} x Empleado</p>
                        </div>
                    </div>
                    <div class="horizontal-cointainer">
                        <div class="payment-method">
                            <h3>Elige el Método de Pago</h3>
                            <div>
                                <button
                                    class="icon-button"
                                    :class="{ selected: paymentMethod === 'Efectivo' }"
                                    @click="handlePaymentMethodChange('Efectivo')"
                                >
                                    <img src="../assets/Bill.png" alt="Bill" class="button-icon" />
                                    Efectivo
                                </button>
                                <button
                                    class="icon-button"
                                    :class="{ selected: paymentMethod === 'BBVA' }"
                                    @click="handlePaymentMethodChange('BBVA')"
                                >
                                    <img src="../assets/Credit-card.png" alt="BBVA" class="button-icon" />
                                    BBVA 1234
                                </button>
                                <button
                                    class="icon-button"
                                    :class="{ selected: paymentMethod === 'Santander' }"
                                    @click="handlePaymentMethodChange('Santander')"
                                >
                                    <img src="../assets/Credit-card.png" alt="Santander" class="button-icon" />
                                    Santander 1234
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="center">

                    <div class="calculator">
                        <button class="key confirm-button" @click="confirmPayment">✓</button>
                        <div class="display" id="display">${{ amountInCalculator.toFixed(2) }}</div> <!-- Display para mostrar la cifra -->
                        
                        <div class="keypad">
                            <button class="key" @click="addToCalculator(1)">1</button>
                            <button class="key" @click="addToCalculator(2)">2</button>
                            <button class="key" @click="addToCalculator(3)">3</button>
                            <button class="key" @click="addToCalculator(4)">4</button>
                            <button class="key" @click="addToCalculator(5)">5</button>
                            <button class="key" @click="addToCalculator(6)">6</button>
                            <button class="key" @click="addToCalculator(7)">7</button>
                            <button class="key" @click="addToCalculator(8)">8</button>
                            <button class="key" @click="addToCalculator(9)">9</button>
                            <button class="key" @click="addToCalculator(0)">0</button>
                            <button class="key" @click="addToCalculator('00')">00</button>
                            <button class="key clear-button" @click="clearCalculator">C</button>

                        </div>
                    </div>


                </div>

                <div class="right">
                    <h3>Pagos</h3>
                    <div v-if="confirmedPayments.length > 0" class="confirmed-payments">
                        <ul>
                            <li v-for="(payment, index) in confirmedPayments" :key="payment.id">
                                {{ payment.method }} | Cantidad: ${{ payment.amount.toFixed(2) }}
                                <button @click="removePayment(index)">❌</button>
                            </li>
                        </ul>
                    </div>
                </div>



                
            </div>   
        </div>

        <div class ="footer">
            <div class="summary">
                    <h4 class ="orange-letters">Total Pagado: ${{ totalPaid.toFixed(2) }}</h4>
                    <h2>Restante por Pagar: ${{ (totalTips - totalPaid).toFixed(2) }}</h2>
                </div>
        
                <button 
                    class="pay-button" 
                    :disabled="pendingPayment !== 0" 
                    @click="savePayments"
                    >
                    Pagar Propinas
                </button>
            </div>
      </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted} from "vue";
  import axios from 'axios';
  
  export default defineComponent({
    name: "TipCalculator",
    data() {
      return {
        totalTips: 1500,
        peopleCount: 1, // Amount of employees to divide the tip into
        confirmedPayments: [] as { id: number; method: string; amount: number }[], 
        totalPaid: 0, // The sum of all the tips already paid
        pendingPayment: 1500, // The missing payment, the total minus the totalPaid
        amountInCalculator: 1500, // Amount in calculator
        paymentMethod: "Efectivo" //The selected payment method to add to the paymenths
      };
    },
    methods: {
      handlePaymentMethodChange(method: string) {
        this.paymentMethod = method;
      },
      addToCalculator(value: string) {
      this.amountInCalculator = parseFloat(this.amountInCalculator.toString() + value.toString());
    },
    clearCalculator() {
      this.amountInCalculator = 0;
    },
     confirmPayment() {
      const payment = {
        id: Date.now(), 
        method: this.paymentMethod, 
        amount: this.amountInCalculator, 
      };

      this.confirmedPayments.push(payment);
      this.updateTotalPaid();
      this.clearCalculator();
    },
    removePayment(index: number) {
        this.confirmedPayments.splice(index, 1);
        this.updateTotalPaid();
    },
    updateTotalPaid() {
        this.totalPaid = this.confirmedPayments.reduce((sum, payment) => sum + payment.amount, 0);
        this.pendingPayment = this.totalTips - this.totalPaid;
    },
    async savePayments() {
        try {
            const paymentData = {
            payments: this.confirmedPayments,
            peopleCount: this.peopleCount,
            totalPaid: this.totalPaid,
            };

            const response = await axios.post('http://localhost:3000/pago', paymentData);

            console.log('Pago guardado:', response.data);
            
            this.confirmedPayments = [];
            this.totalPaid = 0;
            this.pendingPayment = 0;
        } catch (error) {
            console.error('Error al guardar el pago:', error);
        }
    },
    },
    setup() {
  const updatedCashAvailable = ref(0);

  const getPaymentsAndCalculateCash = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pago');

      const paymentsData = response.data;

      const totalCash = paymentsData.reduce((total: number, payment: any) => {
        const efectivoPayments = payment.payments.filter((pay: any) => pay.method === 'Efectivo');

        efectivoPayments.forEach((pay: any) => {
          total += pay.amount;
        });

        return total;
      }, 0);

      updatedCashAvailable.value = totalCash;
      console.log('Total en efectivo calculado:', totalCash); 
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
    }
    };

    onMounted(() => {
        getPaymentsAndCalculateCash();
    });

    return {
        updatedCashAvailable 
    };
    },
  });
  </script>