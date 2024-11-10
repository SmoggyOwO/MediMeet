'use client'

import { useState } from "react"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Calendar, Clock, DollarSign, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/dialog"
import { Label } from "@repo/ui/label"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"

interface Appointment {
  id: number
  doctorName: string
  date: string
  time: string
  fee: number
  paid: boolean
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([
      { id: 1, doctorName: "Dr. Smith", date: "2024-03-15", time: "10:00 AM", fee: 150, paid: false },
      { id: 2, doctorName: "Dr. Johnson", date: "2024-03-18", time: "2:30 PM", fee: 200, paid: true },
      { id: 3, doctorName: "Dr. Williams", date: "2024-03-20", time: "11:15 AM", fee: 175, paid: false },
    ])
  
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null)
  
    const totalAppointments = appointments.length
    const unpaidAppointments = appointments.filter(app => !app.paid).length
  
    const handleCancel = () => {
      if (appointmentToCancel) {
        setAppointments(appointments.filter(app => app.id !== appointmentToCancel.id))
        setAppointmentToCancel(null)
      }
    }
  
    const handlePayment = () => {
      if (selectedAppointment) {
        setAppointments(appointments.map(app => 
          app.id === selectedAppointment.id ? { ...app, paid: true } : app
        ))
        setSelectedAppointment(null)
      }
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800/90 to-emerald-900/40 py-12">
        <div className="container mx-auto p-4 max-w-4xl">
          <Card className="bg-zinc-900/80 border border-zinc-800 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Appointments Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-emerald-400 text-lg font-semibold">{totalAppointments}</p>
                  <p className="text-zinc-400">Total Appointments</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-emerald-400 text-lg font-semibold">{unpaidAppointments}</p>
                  <p className="text-zinc-400">Unpaid Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <div className="space-y-4">
            {appointments.map(appointment => (
              <Card key={appointment.id} className="bg-zinc-900/80 border border-zinc-800">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">{appointment.doctorName}</h3>
                    <div className="flex items-center text-zinc-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center text-zinc-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center text-zinc-400">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>${appointment.fee}</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    {!appointment.paid && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            Pay
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border border-zinc-800">
                          <DialogHeader>
                            <DialogTitle className="text-white">Payment for {appointment.doctorName}</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                              Choose your payment method for the appointment fee of ${appointment.fee}
                            </DialogDescription>
                          </DialogHeader>
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="card" className="border-emerald-500 text-emerald-400" />
                              <Label htmlFor="card" className="text-zinc-300">Credit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paypal" id="paypal" className="border-emerald-500 text-emerald-400" />
                              <Label htmlFor="paypal" className="text-zinc-300">PayPal</Label>
                            </div>
                          </RadioGroup>
                          <DialogFooter>
                            <Button
                              onClick={handlePayment}
                              disabled={!paymentMethod}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            >
                              Confirm Payment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
                          onClick={() => setAppointmentToCancel(appointment)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 border border-zinc-800">
                        <DialogHeader>
                          <DialogTitle className="text-white">Cancel Appointment</DialogTitle>
                          <DialogDescription className="text-zinc-400">
                            Are you sure you want to cancel your appointment with {appointment.doctorName} on {appointment.date} at {appointment.time}?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setAppointmentToCancel(null)}
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                          >
                            Keep Appointment
                          </Button>
                          <Button
                            variant="default"
                            onClick={handleCancel}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Cancel Appointment
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }