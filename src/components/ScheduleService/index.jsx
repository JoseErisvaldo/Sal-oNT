import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import supabase from "../../supabase";

export default function ScheduleService() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    date: "",
    time: "",
    observation: "",
  });
  
  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Add your form submission logic here
    console.log("Form Data Submitted:", formData);
    setOpen(false); // Close the dialog after submission
    
    const { data, error } = await supabase
    .from('appointment_services')
    .insert([formData])
    .select()
    console.log(data)
        
  };

  return (
    <>
      <Button onClick={handleOpen} color="blue">Agendar</Button>
      <Dialog open={open} size="xs" handler={handleOpen} className="overflow-x-auto">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Novo agendamento
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody className="overflow-y-auto max-h-96">
          <Typography className="mb-10 -mt-7" color="gray" variant="lead">
            Informe os dados para agendamento
          </Typography>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Cliente
            </Typography>
            <Input
              label="Nome do Cliente"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Serviço
            </Typography>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="p-2 border rounded-md"
            >
              <option value="">Selecione o serviço</option>
              <option value="service1">Serviço 1</option>
              <option value="service2">Serviço 2</option>
              <option value="service3">Serviço 3</option>
            </select>
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Data
            </Typography>
            <Input
              label="Data"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Horário
            </Typography>
            <Input
              label="Hora"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Observação
            </Typography>
            <Textarea
              label="Observação"
              name="observation"
              value={formData.observation}
              onChange={handleChange}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSubmit}>
            Agendar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
