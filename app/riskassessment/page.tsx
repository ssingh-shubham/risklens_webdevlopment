"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

// Finance Form Interface
interface FinanceFormData {
  Age: number
  Gender: string
  Education_Level: string
  Marital_Status: string
  Income: number
  Credit_Score: number
  Loan_Amount: number
  Loan_Purpose: string
  Employment_Status: string
  Years_at_Current_Job: number
  Payment_History: string
  Debt_to_Income_Ratio: number
  Assets_Value: number
  Number_of_Dependents: number
  Previous_Defaults: number
  Marital_Status_Change: number
}

// Health Form Interface
interface HealthFormData {
  male: number
  age: number
  education: number
  currentSmoker: number
  cigsPerDay: number
  BPMeds: number
  prevalentStroke: number
  prevalentHyp: number
  diabetes: number
  totChol: number
  sysBP: number
  diaBP: number
  BMI: number
  heartRate: number
  glucose: number
}

export default function Page() {
  const router = useRouter()
  const [resetKey, setResetKey] = useState(0)
  const [riskScore] = useState(75) // Mock risk score for AI Assist button
  const [subScores] = useState({ financial: 25, health: 30, time: 20 }) // Mock sub-scores
  
  // Mock user ID - replace with actual user authentication
  const userId = 1 // Replace with actual user ID from your auth system

  // Finance Form State
  const [financeForm, setFinanceForm] = useState<Partial<FinanceFormData>>({
    Age: 30,
    Gender: "",
    Education_Level: "",
    Marital_Status: "",
    Income: undefined,
    Credit_Score: undefined,
    Loan_Amount: undefined,
    Loan_Purpose: "",
    Employment_Status: "",
    Years_at_Current_Job: undefined,
    Payment_History: "",
    Debt_to_Income_Ratio: undefined,
    Assets_Value: undefined,
    Number_of_Dependents: undefined,
    Previous_Defaults: undefined,
    Marital_Status_Change: undefined,
  })

  // Health Form State
  const [healthForm, setHealthForm] = useState<Partial<HealthFormData>>({
    male: undefined,
    age: 30,
    education: 1,
    currentSmoker: undefined,
    cigsPerDay: undefined,
    BPMeds: undefined,
    prevalentStroke: undefined,
    prevalentHyp: undefined,
    diabetes: undefined,
    totChol: undefined,
    sysBP: undefined,
    diaBP: undefined,
    BMI: undefined,
    heartRate: undefined,
    glucose: undefined,
  })

  // Results State
  const [financeResult, setFinanceResult] = useState<any>(null)
  const [healthResult, setHealthResult] = useState<any>(null)
  const [financeError, setFinanceError] = useState<string | null>(null)
  const [healthError, setHealthError] = useState<string | null>(null)
  const [financeLoading, setFinanceLoading] = useState(false)
  const [healthLoading, setHealthLoading] = useState(false)

  // Auto-calculate Debt-to-Income Ratio
  useEffect(() => {
    if (financeForm.Loan_Amount !== undefined && financeForm.Income !== undefined && financeForm.Income !== 0) {
      setFinanceForm((prev) => ({
        ...prev,
        Debt_to_Income_Ratio: prev.Loan_Amount! / prev.Income!,
      }))
    }
  }, [financeForm.Loan_Amount, financeForm.Income])

  // Finance Form Handlers
  const updateFinanceForm = (field: keyof FinanceFormData, value: any) => {
    setFinanceForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFinanceLoading(true)
    setFinanceError(null)

    try {
      // Map marital status to numeric value
      let maritalStatusChange = 0
      if (financeForm.Marital_Status === "Married") maritalStatusChange = 1
      else if (financeForm.Marital_Status === "Divorced") maritalStatusChange = 2

      const payload = {
        ...financeForm,
        Marital_Status_Change: maritalStatusChange,
      }

      // Get prediction from ML API
      const response = await fetch("http://localhost:8000/finance/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to get finance prediction")
      }
      
      setFinanceResult(data)

      // Save to database
      const savePayload = {
        ...payload,
        userId: userId,
        riskRating: data["Risk Rating"]
      }

      const saveResponse = await fetch('/riskassessment/api/finance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savePayload)
      })

      const saveResult = await saveResponse.json()
      if (!saveResponse.ok) {
        console.warn('Failed to save finance assessment:', saveResult.error)
        // Continue execution - don't fail the whole process if save fails
      } else {
        console.log('Finance assessment saved with ID:', saveResult.assessmentId)
      }

    } catch (err: any) {
      setFinanceError(err.message || "An error occurred")
    } finally {
      setFinanceLoading(false)
    }
  }

  // Health Form Handlers
  const updateHealthForm = (field: keyof HealthFormData, value: any) => {
    setHealthForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleHealthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHealthLoading(true)
    setHealthError(null)

    try {
      // Get prediction from ML API
      const response = await fetch("http://127.0.0.1:8000/health/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(healthForm),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to get health prediction")
      }
      
      setHealthResult(data)

      // Save to database
      const savePayload = {
        ...healthForm,
        userId: userId,
        TenYearCHD: data.TenYearCHD,
        probability: data.probability
      }

      const saveResponse = await fetch('/riskassessment/api/health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savePayload)
      })

      const saveResult = await saveResponse.json()
      if (!saveResponse.ok) {
        console.warn('Failed to save health assessment:', saveResult.error)
        // Continue execution - don't fail the whole process if save fails
      } else {
        console.log('Health assessment saved with ID:', saveResult.assessmentId)
      }

    } catch (err: any) {
      setHealthError(err.message || "An error occurred")
    } finally {
      setHealthLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="relative max-w-6xl mx-auto py-12 space-y-8">
        {/* Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
            animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20 }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-40 right-10"
            animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 25 }}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Finance Risk Form */}
          <Card className="shadow-lg rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-900 dark:text-gray-100 relative z-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Finance Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFinanceSubmit} className="space-y-4">
                {/* Age */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Age *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your age in years</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Age !== undefined ? financeForm.Age : ""}
                    onChange={(e) => updateFinanceForm("Age", e.target.value === "" ? undefined : Number.parseInt(e.target.value))}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Gender *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select your gender</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select value={financeForm.Gender} onValueChange={(value) => updateFinanceForm("Gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Education Level */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Education Level *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Highest education achieved by the individual</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={financeForm.Education_Level}
                    onValueChange={(value) => updateFinanceForm("Education_Level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                      <SelectItem value="Master's">Master's</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Marital Status */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Marital Status *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current marital status</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={financeForm.Marital_Status}
                    onValueChange={(value) => updateFinanceForm("Marital_Status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Income and Loan Amount */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="cursor-help">Income (USD) *</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your annual income in US dollars</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      type="number"
                      value={financeForm.Income !== undefined ? financeForm.Income : ""}
                      onChange={(e) => updateFinanceForm("Income", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="cursor-help">Loan Amount (USD) *</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The amount you wish to borrow</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      type="number"
                      value={financeForm.Loan_Amount !== undefined ? financeForm.Loan_Amount : ""}
                      onChange={(e) => updateFinanceForm("Loan_Amount", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                      required
                    />
                  </div>
                </div>

                {/* Debt to Income Ratio (Read-only) */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Debt-to-Income Ratio (Auto-calculated)</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Calculated automatically: loan amount ÷ annual income</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Debt_to_Income_Ratio !== undefined ? financeForm.Debt_to_Income_Ratio.toFixed(4) : "0"}
                    readOnly
                    className="bg-gray-100 dark:bg-gray-700"
                  />
                </div>

                {/* Credit Score */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Credit Score *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current credit score (typically 300-850)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Credit_Score !== undefined ? financeForm.Credit_Score : ""}
                    onChange={(e) => updateFinanceForm("Credit_Score", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Loan Purpose */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Loan Purpose *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The primary reason for requesting this loan</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={financeForm.Loan_Purpose}
                    onValueChange={(value) => updateFinanceForm("Loan_Purpose", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Auto">Auto</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Employment Status */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Employment Status *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current employment situation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={financeForm.Employment_Status}
                    onValueChange={(value) => updateFinanceForm("Employment_Status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                      <SelectItem value="Self-employed">Self-employed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Years at Current Job */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Years at Current Job *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of years you've been employed at your current position</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Years_at_Current_Job !== undefined ? financeForm.Years_at_Current_Job : ""}
                    onChange={(e) => updateFinanceForm("Years_at_Current_Job", e.target.value === "" ? undefined : Number.parseInt(e.target.value))}
                    required
                  />
                </div>

                {/* Payment History */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Payment History *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your track record of making loan and credit payments on time</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={financeForm.Payment_History}
                    onValueChange={(value) => updateFinanceForm("Payment_History", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assets Value */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Assets Value (USD) *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total approximate value of your assets (property, investments, savings, etc.)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Assets_Value !== undefined ? financeForm.Assets_Value : ""}
                    onChange={(e) => updateFinanceForm("Assets_Value", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Number of Dependents */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Number of Dependents *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of people financially dependent on you (spouse, children, etc.)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Number_of_Dependents !== undefined ? financeForm.Number_of_Dependents : ""}
                    onChange={(e) => updateFinanceForm("Number_of_Dependents", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Previous Defaults */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Previous Defaults *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of times you have previously defaulted on loan payments</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={financeForm.Previous_Defaults !== undefined ? financeForm.Previous_Defaults : ""}
                    onChange={(e) => updateFinanceForm("Previous_Defaults", e.target.value === "" ? undefined : Number.parseInt(e.target.value))}
                    required
                  />
                </div>

                {financeError && <p className="text-red-600 dark:text-red-400 text-sm">{financeError}</p>}

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button type="submit" className="w-full" disabled={financeLoading}>
                    {financeLoading ? "Analyzing..." : "Submit"}
                  </Button>
                </motion.div>
              </form>

              {/* Finance Results */}
              {financeResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <h3 className="font-semibold text-lg mb-2">Finance Risk Rating</h3>
                  <div className="text-sm">
                    <p><strong>Risk Rating:</strong> {financeResult["Risk Rating"]}</p>
                    <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Assessment saved for continuous model improvement</p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Health Risk Form */}
          <Card className="shadow-lg rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-900 dark:text-gray-100 relative z-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-green-500 to-teal-500 bg-clip-text text-transparent">
                Health Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHealthSubmit} className="space-y-4">
                {/* Gender (Male) */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Gender *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select your biological gender</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.male !== undefined ? healthForm.male.toString() : ""}
                    onValueChange={(value) => updateHealthForm("male", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="0">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Age *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current age in years</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={healthForm.age !== undefined ? healthForm.age : ""}
                    onChange={(e) => updateHealthForm("age", e.target.value === "" ? undefined : Number.parseInt(e.target.value))}
                    required
                  />
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Education *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your highest level of education completed</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.education !== undefined ? healthForm.education.toString() : ""}
                    onValueChange={(value) => updateHealthForm("education", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Bachelor's</SelectItem>
                      <SelectItem value="2">Master's</SelectItem>
                      <SelectItem value="3">PhD</SelectItem>
                      <SelectItem value="4">High School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Smoker */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Current Smoker *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Are you currently a regular smoker?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.currentSmoker !== undefined ? healthForm.currentSmoker.toString() : ""}
                    onValueChange={(value) => updateHealthForm("currentSmoker", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cigarettes Per Day */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Cigarettes Per Day *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average number of cigarettes you smoke per day (enter 0 if non-smoker)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.cigsPerDay !== undefined ? healthForm.cigsPerDay : ""}
                    onChange={(e) => updateHealthForm("cigsPerDay", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Blood Pressure Medicines */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Blood Pressure Medicines *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Are you currently taking medication for blood pressure?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.BPMeds !== undefined ? healthForm.BPMeds.toString() : ""}
                    onValueChange={(value) => updateHealthForm("BPMeds", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prevalent Stroke */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Prevalent Stroke *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Have you ever had a stroke?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.prevalentStroke !== undefined ? healthForm.prevalentStroke.toString() : ""}
                    onValueChange={(value) => updateHealthForm("prevalentStroke", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prevalent Hypertension */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Prevalent Hypertension *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Do you have high blood pressure (hypertension)?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.prevalentHyp !== undefined ? healthForm.prevalentHyp.toString() : ""}
                    onValueChange={(value) => updateHealthForm("prevalentHyp", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Diabetes */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Diabetes *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Do you have diabetes (Type 1 or Type 2)?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select
                    value={healthForm.diabetes !== undefined ? healthForm.diabetes.toString() : ""}
                    onValueChange={(value) => updateHealthForm("diabetes", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Total Cholesterol */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Total Cholesterol *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your total cholesterol level in mg/dL (typically 100-300)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.totChol !== undefined ? healthForm.totChol : ""}
                    onChange={(e) => updateHealthForm("totChol", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Systolic BP */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Systolic Blood Pressure *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The top number in your blood pressure reading (e.g., 120 in 120/80)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.sysBP !== undefined ? healthForm.sysBP : ""}
                    onChange={(e) => updateHealthForm("sysBP", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Diastolic BP */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Diastolic Blood Pressure *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The bottom number in your blood pressure reading (e.g., 80 in 120/80)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.diaBP !== undefined ? healthForm.diaBP : ""}
                    onChange={(e) => updateHealthForm("diaBP", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* BMI */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">BMI *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your Body Mass Index (weight in kg ÷ height in meters²)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.BMI !== undefined ? healthForm.BMI : ""}
                    onChange={(e) => updateHealthForm("BMI", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Heart Rate */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Heart Rate *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your resting heart rate in beats per minute (typically 60-100)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.heartRate !== undefined ? healthForm.heartRate : ""}
                    onChange={(e) => updateHealthForm("heartRate", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {/* Glucose */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="cursor-help">Glucose *</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your blood glucose level in mg/dL (fasting: 70-100, random: under 200)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    step="0.1"
                    value={healthForm.glucose !== undefined ? healthForm.glucose : ""}
                    onChange={(e) => updateHealthForm("glucose", e.target.value === "" ? undefined : Number.parseFloat(e.target.value))}
                    required
                  />
                </div>

                {healthError && <p className="text-red-600 dark:text-red-400 text-sm">{healthError}</p>}

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button type="submit" className="w-full" disabled={healthLoading}>
                    {healthLoading ? "Analyzing..." : "Submit"}
                  </Button>
                </motion.div>
              </form>

              {/* Health Results */}
              {healthResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                >
                  <h3 className="font-semibold text-lg mb-2">Health Prediction Result</h3>
                  <div className="text-sm space-y-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="cursor-help">Ten Year CHD: {healthResult.TenYearCHD}</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Estimated 10 years risk for Chronic Heart Disease.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p><strong>Probability:</strong> {healthResult.probability}</p>
                    <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Assessment saved for continuous model improvement</p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-2 justify-center">
          <Button
            variant="outline"
            className="flex-1 max-w-xs bg-transparent"
            onClick={() => setResetKey((prev) => prev + 1)}
          >
            Reset Cards
          </Button>

          <Button
            variant="default"
            className="flex-1 max-w-xs"
            onClick={() => {
              const url = `/ai-assistant?riskScore=${riskScore}&financial=${subScores.financial}&health=${subScores.health}&time=${subScores.time}`
              router.push(url)
            }}
          >
            AI Assist
          </Button>

          <Button
            variant="default"
            className="flex-1 max-w-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => {
              // Pass the API results to dashboard
              const dashboardData = {
                financeResult: financeResult,
                healthResult: healthResult,
                financeForm: financeForm,
                healthForm: healthForm,
              }
              // Use sessionStorage for better compatibility
              if (typeof window !== 'undefined') {
                sessionStorage.setItem("dashboardData", JSON.stringify(dashboardData))
              }
              router.push("/riskassessment/dashboard")
            }}
            disabled={!financeResult && !healthResult}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}