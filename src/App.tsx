import {useState} from "react";
import {Button, Input, Typography} from "antd";

export const App = () => {
  const [formData, setFormData] = useState({
    nights: "",
    coaches: "",
    athletes: "",
    sglPrice: "",
    twinPrice: "",
    bus20Airport: "",
    bus45Airport: "",
    bus20Pool: "",
    bus45Pool: "",
    poolHours: {} as { [key: string]: string },
    gymHours: {} as { [key: string]: string },
    lunch: "",
    dinner: "",
    gym: "",
    pool: "",
    transferHotelAirport: "",
    transferPoolHotel: "",
  });

  // Dates from 15.04 to 30.04
  const dates = Array.from({ length: 16 }, (_, i) => {
    const day = i + 15;
    return `${day < 10 ? "0" : ""}${day}.04`;
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: string, type: "poolHours" | "gymHours", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [date]: value },
    }));
  };

  const calculate = () => {
    const nights = Number(formData.nights) || 0;
    const coaches = Number(formData.coaches) || 0;
    const athletes = Number(formData.athletes) || 0;
    const sglPrice = Number(formData.sglPrice) || 0;
    const twinPrice = Number(formData.twinPrice) || 0;
    const totalPoolHours = Object.values(formData.poolHours).reduce((sum, v) => sum + (Number(v) || 0), 0);
    const totalGymHours = Object.values(formData.gymHours).reduce((sum, v) => sum + (Number(v) || 0), 0);

    const totalCost = nights * (coaches + athletes) * (sglPrice + twinPrice) + totalPoolHours * 50 + totalGymHours * 30;
    alert(`Загальна вартість: $${totalCost}`);
  };

  return (
    <div className="p-6">
      <Typography.Title className="underline" level={4}>Розрахунок</Typography.Title>
      <div className="flex flex-col gap-2">
        {/* Your other input fields */}
        <Typography.Title level={5}>Кількість ночей:</Typography.Title>
        <Input onChange={(e) => handleChange("nights", e.target.value)} />
        <Typography.Title level={5}>Тренерів:</Typography.Title>
        <Input onChange={(e) => handleChange("coaches", e.target.value)} />
        <Typography.Title level={5}>Атлетів:</Typography.Title>
        <Input onChange={(e) => handleChange("athletes", e.target.value)} />
        <Typography.Title level={5}>SGL ($/ніч):</Typography.Title>
        <Input onChange={(e) => handleChange("sglPrice", e.target.value)} />
        <Typography.Title level={5}>TWIN ($/ніч):</Typography.Title>
        <Input onChange={(e) => handleChange("twinPrice", e.target.value)} />
        <Typography.Title level={5}>Автобус 20 pax (airport) ($/рейс):</Typography.Title>
        <Input onChange={(e) => handleChange("bus20Airport", e.target.value)} />
        <Typography.Title level={5}>Автобус 45 pax (airport) ($/рейс):</Typography.Title>
        <Input onChange={(e) => handleChange("bus45Airport", e.target.value)} />
        <Typography.Title level={5}>Автобус 20 pax (pool) ($/рейс):</Typography.Title>
        <Input onChange={(e) => handleChange("bus20Pool", e.target.value)} />
        <Typography.Title level={5}>Автобус 45 pax (pool) ($/рейс):</Typography.Title>
        <Input onChange={(e) => handleChange("bus45Pool", e.target.value)} />
      </div>
      <br />

      <div>
        <Typography.Title level={4}>Календар</Typography.Title>
        {dates.map((date) => (
          <div key={date} className="bg-gray-100 rounded-xl p-3">
            <p className="mb-2 font-semibold">{date}</p>
            <div className="flex items-center gap-3">
              <p className="flex-shrink-0 w-[100px]">Pool (год)</p>
              <Input
                size="small"
                type="number"
                value={formData.poolHours[date] || ""}
                onChange={(e) => handleDateChange(date, "poolHours", e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="flex-shrink-0 w-[100px]">Gym (год)</p>
              <Input
                size="small"
                type="number"
                value={formData.gymHours[date] || ""}
                onChange={(e) => handleDateChange(date, "gymHours", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="primary" className="mt-4" onClick={calculate}>
        Розрахувати
      </Button>

      {/* Display results */}
      <div className="mt-6">
        <Typography.Title level={4}>Результат</Typography.Title>
        <div className="flex flex-col">
          <p>Lunch: {formData.lunch || "0.00"} грн</p>
          <p>Dinner: {formData.dinner || "0.00"} грн</p>
          <p>Gym: {formData.gym || "0.00"} грн</p>
          <p>Pool: {formData.pool || "0.00"} грн</p>
          <p>Transfers hotel-airport: {formData.transferHotelAirport || "0.00"} грн</p>
          <p>Transfer pool hotel: {formData.transferPoolHotel || "0.00"} грн</p>
        </div>
      </div>
    </div>
  );
};
