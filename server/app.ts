import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes'
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", router);

app.get("/pago", (req: Request, res: Response) => {
    fs.readFile("payments.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo", err);
        return res.status(500).send("Error al leer los recibos");
      }
  
      const paymentsData = JSON.parse(data || "[]");
      res.json(paymentsData); 
    });
  });

app.post('/pago', (req: Request, res: Response) => {
    const { payments, peopleCount, totalPaid } = req.body;
    const currentDateTime = new Date().toISOString();
    console.log('Datos recibidos:', { payments, peopleCount, totalPaid, timeStamp: currentDateTime });
  
    const filePath = 'payments.json';
  
    fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string | undefined) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log('Archivo no encontrado, creando uno nuevo...');
        } else {
          console.error('Error al leer el archivo', err);
          res.status(500).send('Error al procesar la solicitud');
          return;
        }
      }
  
      const currentData: any[] = data ? JSON.parse(data) : [];
  
      const newPayment = {
        payments,
        peopleCount,
        totalPaid,
        timeStamp: currentDateTime, 
      };
  
      const newData = [...currentData, newPayment];
  
      fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error('Error al guardar el archivo', err);
          res.status(500).send('Error al guardar el archivo');
          return;
        }
  
        res.status(200).send('Pago registrado con éxito');
      });
    });
  });
  
  export default app;