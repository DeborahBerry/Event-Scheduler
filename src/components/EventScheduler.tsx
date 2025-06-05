import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameWeek, isSameMonth, startOfWeek, endOfWeek } from "date-fns";
import { useForm } from "react-hook-form";

// Define the Event type
interface Event {
  id: number;
  title: string;
  date: string;
}

// Define the form data type
interface FormData {
  title: string;
  date: string;
}

const useEventScheduler = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    setEvents([...events, { ...event, id: Date.now() }]);
  };

  const updateEvent = (id: number, updatedEvent: Omit<Event, 'id'>) => {
    setEvents(events.map(e => (e.id === id ? { ...e, ...updatedEvent } : e)));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return { events, addEvent, updateEvent, deleteEvent };
};

const EventScheduler = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventScheduler();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState<"week" | "month">("month");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, data);
    } else {
      addEvent(data);
    }
    reset();
    setSelectedEvent(null);
    setOpen(false);
  };

  const openEditForm = (event: Event) => {
    setSelectedEvent(event);
    setValue("title", event.title);
    setValue("date", event.date);
    setOpen(true);
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    if (view === "week") {
      return isSameWeek(eventDate, new Date());
    }
    return isSameMonth(eventDate, new Date());
  });

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Event Scheduler</h1>

      <div className="flex items-center space-x-4">
        <Button onClick={() => { reset(); setSelectedEvent(null); setOpen(true); }}>Add New Event</Button>
        <Button variant={view === "week" ? "default" : "outline"} onClick={() => setView("week")}>This Week</Button>
        <Button variant={view === "month" ? "default" : "outline"} onClick={() => setView("month")}>This Month</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="Event Title" {...register("title", { required: "Title is required" })} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <Input type="date" {...register("date", { required: "Date is required" })} />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>
            <Button type="submit">{selectedEvent ? "Update" : "Save"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events scheduled for this {view}.</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="border p-3 rounded shadow flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">{format(new Date(event.date), "PPP")}</p>
              </div>
              <div className="space-x-2">
                <Button size="sm" onClick={() => openEditForm(event)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteEvent(event.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventScheduler;