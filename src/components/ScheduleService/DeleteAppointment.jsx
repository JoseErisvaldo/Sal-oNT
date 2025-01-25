import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import supabase from "../../supabase";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteAppointment({ appointmentId, onDeleteSuccess }) {
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    const { error } = await supabase
      .from('appointment_services')
      .delete()
      .eq('id', appointmentId);
    
    if (error) {
      console.log("Erro ao excluir o agendamento:", error.message);
    } else {
      onDeleteSuccess(); 
      handleOpen();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} className="w-[25px] p-0">
        <TrashIcon className="h-6 w-6 bg-red-500 hover:text-red-500 rounded" />
      </Button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader className="flex flex-col items-start">
          <Typography variant="h4">Confirmar Exclusão</Typography>
        </DialogHeader>
        <DialogBody>
          <Typography color="gray" variant="lead">
            Você tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
