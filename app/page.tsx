"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Users, AlertCircle, CheckCircle, Plus } from "lucide-react";
import { showClock } from "@/lib/time-utils";
import { taPago } from "@/lib/calculator";
import { generateQueries } from "@/lib/query-generator";
import Image from "next/image";

export default function TapagoCalculator() {
  const [peopleInQueue, setPeopleInQueue] = useState("10");
  const [intervalTime, setIntervalTime] = useState("14:00");
  const [currentTime, setCurrentTime] = useState("");
  const [result, setResult] = useState("");
  const [showQueries, setShowQueries] = useState(false);
  const [queryDate, setQueryDate] = useState("");
  const [failureCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showSecretButton, setShowSecretButton] = useState(true);
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(showClock());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const checkSecretButtonVisibility = () => {
      const secretButtonData = localStorage.getItem(
        "tapago_secret_button_clicked",
      );
      if (secretButtonData) {
        const { timestamp } = JSON.parse(secretButtonData);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - timestamp < twentyFourHours) {
          setShowSecretButton(false);
        } else {
          // Expired, remove from localStorage
          localStorage.removeItem("tapago_secret_button_clicked");
        }
      }
    };

    checkSecretButtonVisibility();

    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    const calculationResult = taPago(peopleInQueue, `${intervalTime}:00`);
    setResult(calculationResult);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handleCreateQuery = () => {
    setShowQueries(!showQueries);
  };

  const handleFailButtonClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSecretButtonClick = () => {
    const clickData = {
      timestamp: Date.now(),
    };
    localStorage.setItem(
      "tapago_secret_button_clicked",
      JSON.stringify(clickData),
    );

    setShowSecretButton(false);
    setShowSecretMessage(true);

    setTimeout(() => {
      setShowSecretMessage(false);
    }, 2000);
  };

  const sqlQueries = generateQueries(
    queryDate || new Date().toISOString().slice(0, 10).replace(/-/g, ""),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            O de hoje tá pago?
          </h1>
          <p className="text-gray-600">Calculadora onisciente</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calculator Section */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-blue-600" />
                Calculadora
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="people" className="text-base font-medium">
                  Pessoas na frente
                </Label>
                <Input
                  id="people"
                  type="number"
                  value={peopleInQueue}
                  onChange={(e) => setPeopleInQueue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg"
                  placeholder="Digite o número de pessoas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval" className="text-base font-medium">
                  Intervalo / saída
                </Label>
                <Input
                  id="interval"
                  type="time"
                  value={intervalTime}
                  onChange={(e) => setIntervalTime(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg"
                />
              </div>

              <Button
                onClick={handleVerify}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 text-lg"
              >
                Verify
              </Button>

              {result && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-lg border ${
                    result === "Mamou"
                      ? "bg-red-50 border-red-200"
                      : result === "Tá pago!"
                        ? "bg-green-50 border-green-200"
                        : "bg-blue-50 border-blue-200"
                  }`}
                >
                  {result === "Mamou" ? (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  <span
                    className={`text-lg font-semibold ${result === "Mamou" ? "text-red-800" : "text-green-800"}`}
                  >
                    {result}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Section */}
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">
                  Quantas vezes a calculadora falhou
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-base text-gray-700">
                    A calculadora falhou{" "}
                    <span className="text-red-600 font-semibold">
                      {failureCount} vezes
                    </span>
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleFailButtonClick}
                    className="h-6 w-6 p-0 border-red-300 hover:bg-red-50 bg-transparent"
                  >
                    <Plus className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-2xl font-mono">
                <Clock className="h-6 w-6 text-gray-600" />
                <span>{currentTime}</span>
              </div>

              <div className="absolute bottom-2 right-2">
                {showSecretButton && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSecretButtonClick}
                    className="text-xs px-2 py-1 h-auto text-gray-400 hover:text-gray-600"
                  >
                    Não clique
                  </Button>
                )}

                {showSecretMessage && (
                  <div className="absolute bottom-0 right-0 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm max-w-sm w-80 shadow-lg">
                    <p className="text-gray-800 leading-tight">te amo bibi</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SQL Queries Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Consultas SQL</CardTitle>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Data (ex: 20241230)"
                  value={queryDate}
                  onChange={(e) => setQueryDate(e.target.value)}
                  className="w-48"
                />
                <Button variant="outline" onClick={handleCreateQuery}>
                  {showQueries ? "Ocultar" : "Criar query"}
                </Button>
              </div>
            </div>
          </CardHeader>
          {showQueries && (
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 overflow-x-auto">
                {sqlQueries.map((query, index) => (
                  <div key={index} className="whitespace-nowrap">
                    {query}
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Alert Modal Dialog */}
        <Dialog open={showAlert} onOpenChange={setShowAlert}>
          <DialogContent className="max-w-md">
            <DialogTitle className="hidden" />
            <DialogHeader></DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src="https://i.imgflip.com/a4lznd.jpg"
                  width={1200}
                  height={1200}
                  alt="Meme da calculadora"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-center text-sm leading-relaxed text-gray-700">
                Entendi que a calculadora não falha e sou um pecador, nunca mais
                cometerei a blasfêmia de duvidar daquela que sabe de tudo e
                todos.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseAlert} className="w-full">
                Confirmo que entendi.
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
