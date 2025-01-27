import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import supabase from "../../supabase";
import DeleteAppointment from "./DeleteAppointment";

export default function ScheduleService() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    date: "",
    time: "",
    observation: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const [appointmentServices, setAppointmentServices] = useState([]);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    setOpen(false);
    
    const { data, error } = await supabase
      .from('appointment_services')
      .insert([formData])
      .select();

    if (error) {
      console.log("Error inserting service:", error.message);
    } else {
      await getServices(formData.date);
    }
    
    setFormData({
      name: "",
      service: "",
      date: "",
      time: "",
      observation: "",
    });
  };

  const getServices = async (date) => {
    setAppointmentServices([]);
    if (!date) {
      return;
    }
    setIsLoading(true)
    
    const { data, error } = await supabase
      .from('appointment_services')
      .select()
      .eq('date', date)
      .order('time', { ascending: true });

    if (data) {
      setAppointmentServices(data);
      setIsLoading(false)
      console.log('teste')
    }
    
    if (error) {
      console.log("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    if (formData.date) {
      getServices(formData.date);
    }
  }, [formData.date]);

  const timeSlotsMorning = [
    "07:20", "07:40", "08:00", "08:20", "08:40", "09:00", "09:20", "09:40", 
    "10:00", "10:20", "10:40", "11:00", "11:20", "11:40"
  ];

  const timeSlotsAfternoon = [
    "13:20", "14:00", "14:20", "14:40", "15:00", 
    "15:20", "15:40", "16:00", "16:20", "16:40", "17:00", "17:20", "17:40", 
    "18:00", "18:20", "18:40", "19:00", "19:20", "19:40"
  ];

  const availableTimesMorning = timeSlotsMorning.filter((time) => 
    !appointmentServices.some((service) => service.time === time)
  );

  const availableTimesAfternoon = timeSlotsAfternoon.filter((time) => 
    !appointmentServices.some((service) => service.time === time)
  );

  const handleDeleteSuccess = () => {
    getServices(formData.date);
    console.log("Agendamento excluído");
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
              className="p-2 border rounded-md bg-white"
            >
              <option value="">Selecione o serviço</option>
              <option value="Barba">Barba</option>
              <option value="Corte">Corte</option>
              <option value="Degrade navalhado">Degrade navalhado</option>
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
            {appointmentServices && (  
              <>
                <Typography className="-mb-1" color="blue-gray" variant="h4">
                  Agendamentos parte da manhã
                </Typography>
                <div className="flex justify-between text-sm">
                  <div className="border-r-2 border-gray-400 pr-2">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                      Agendamentos marcados
                    </Typography>
                    {isLoading && <p className=" flex items-center justify-between rounded bg-green-600 text-white p-2">
                      Carregando <Spinner color="white" />
                      </p>}
                      {isLoading !== true && appointmentServices.length === 0 && (
                        <p className=" flex items-center justify-between rounded bg-red-600 text-white p-2">
                        Nenhum agendamento marcado
                        </p>
                      )}
                    {appointmentServices.filter((service) => timeSlotsMorning.includes(service.time))
                      .map((service) => (
                        <div key={service.id} className="flex items-center justify-between border-b-2 border-gray-400 pb-2">
                          <div>{service.time} - {service.service} - {service.name}</div>
                          <DeleteAppointment 
                            appointmentId={service.id} 
                            onDeleteSuccess={handleDeleteSuccess} 
                          />
                        </div>
                    ))}
                  </div>
                  <div className="pl-2">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                      Agendamentos disponíveis
                    </Typography>
                    {availableTimesMorning.map((time) => (
                      <div key={time}>{time} - <span className="text-green-500">Disponível</span></div>
                    ))}
                  </div>
                </div>

                <Typography className="-mb-1" color="blue-gray" variant="h4">
                  Agendamentos da tarde
                </Typography>
                <div className="flex justify-between text-sm">
                  <div className="border-r-2 border-gray-400 pr-2">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                      Agendamentos marcados
                    </Typography>
                    {isLoading && <p className=" flex items-center justify-between rounded bg-green-600 text-white p-2">
                      Carregando <Spinner color="white" />
                      </p>}
                      {isLoading !== true && appointmentServices.length === 0 && (
                        <p className=" flex items-center justify-between rounded bg-red-600 text-white p-2">
                        Nenhum agendamento marcado
                        </p>
                      )}
                    {appointmentServices.filter((service) => timeSlotsAfternoon.includes(service.time))
                      .map((service) => (
                        <div key={service.id} className="flex items-center justify-between border-b-2 border-gray-400 pb-2">
                          <div>{service.time} - {service.service} - {service.name}</div>
                          <DeleteAppointment 
                            appointmentId={service.id} 
                            onDeleteSuccess={handleDeleteSuccess} 
                          />
                        </div>
                    ))}
                  </div>
                  <div className="pl-2">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                      Agendamentos disponíveis
                    </Typography>
                    {availableTimesAfternoon.map((time) => (
                      <div key={time}>{time} - <span className="text-green-500">Disponível</span></div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Horário
            </Typography>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="p-2 border rounded-md bg-white"
            >
              <option value="">Selecione a hora</option>
              {availableTimesMorning.concat(availableTimesAfternoon).map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
          <Button variant="text" color="gray" className="bg-white" onClick={handleOpen}>
            Cancelar
          </Button>
          <a href="/home" variant="gradient" color="blue" onClick={handleSubmit}>
            Agendar
          </a>
        </DialogFooter>
      </Dialog>
    </>
  );
}
