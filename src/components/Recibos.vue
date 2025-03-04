<template>
    <div class="receipt-container">
      <h2>Recibos de Pago</h2>
      <button @click="getReceipts">Cargar Pagos</button>
      <ul class="receipt-list">
        <li v-for="(paymentGroup, index) in payments" :key="index" class="receipt-item">
          <p><strong>Fecha y Hora:</strong> {{ formatDate(paymentGroup.timeStamp) }}</p>
          <p><strong>División Realizada en :</strong> {{ paymentGroup.peopleCount }} empleados</p> 
          <div v-for="(payment, subIndex) in paymentGroup.payments" :key="subIndex" class="payment-info">
            <div class="payment-detail">
              <p><strong>Método de Pago:</strong> {{ payment.method }}</p>
            </div>
            <div class="payment-detail">
              <p><strong>Cantidad:</strong> ${{ payment.amount ? payment.amount.toFixed(2) : '0.00' }}</p>
            </div>
          </div>
          <p><strong>Total Pagado:</strong> ${{ paymentGroup.totalPaid ? paymentGroup.totalPaid.toFixed(2) : '0.00' }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  
  <style scoped>
  .receipt-container {
    margin: 20px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .receipt-list {
    list-style-type: none;
    padding: 0;
  }
  
  .receipt-item {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 10px;
  }
  
  .receipt-item p {
    margin: 5px 0;
  }
  
  .receipt-item strong {
    color: #ff4d4d;
  }
  
  .payment-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .payment-detail {
    width: 48%; 
  }
  
  .payment-detail p {
    margin: 0;
    font-size: 14px;
  }
  </style>
  
    
  <script lang="ts">

  import { defineComponent } from "vue";
  export default defineComponent({
  name: "Re-cibos",
  data() {
    return {
      payments: [] as Array<{ 
        payments: { method: string; amount: number }[]; 
        timeStamp: string; 
        totalPaid: number; 
        peopleCount: number;
      }>,
    };
  },
  methods: {
    async getReceipts() {
      try {
        const response = await fetch("http://localhost:3000/pago", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);

        // Asignamos los datos asegurándonos de que payments está definido
        this.payments = data.map((item: any) => ({
          payments: item.payments,
          timeStamp: item.timeStamp,
          totalPaid: item.totalPaid,
          peopleCount: item.peopleCount, 
        }));
      } catch (error) {
        console.error("Error al obtener los recibos:", error);
      }
    },

    formatDate(timeStamp: string): string {
      const date = new Date(timeStamp);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      return date.toLocaleString('es-ES', options);
    },
  }
});
</script>