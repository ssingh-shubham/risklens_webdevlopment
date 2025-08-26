"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { ArrowLeft, Brain, CheckCircle, Clock, History, Save, Shield, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
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

interface DashboardData {
  financeResult: any
  healthResult: any
  financeForm: FinanceFormData
  healthForm: HealthFormData
  timestamp?: number
}

interface ScoreData {
  healthScore: number
  financeScore: number
  timeHorizonScore: number
  overallRiskScore: number
  healthClassification: string
  financeClassification: string
  timeHorizonInterpretation: string
  overallRiskInterpretation: string
}

interface SavedScore {
  id: number
  Tscore: number
  Financial: number
  Health: number
  TimeHori: number
  createdAt: string
}

export default function Dashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [scores, setScores] = useState<ScoreData | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<{
    health: string
    finance: string
    timeHorizon: string
    overall: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [previousScores, setPreviousScores] = useState<SavedScore[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Check if user is authenticated
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') || localStorage.getItem('token')
    }
    return null
  }

  const isAuthenticated = () => {
    const token = getAuthToken()
    if (!token) return false
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp > Date.now() / 1000
    } catch {
      return false
    }
  }

  useEffect(() => {
    console.log("Dashboard useEffect triggered")
    
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Add debugging logs
      console.log("Available localStorage keys:", Object.keys(localStorage))
      console.log("Available sessionStorage keys:", Object.keys(sessionStorage))
      
      // Try both localStorage and sessionStorage
      let data = localStorage.getItem("dashboardData")
      let source = "localStorage"
      
      if (!data) {
        data = sessionStorage.getItem("dashboardData")
        source = "sessionStorage"
      }
      
      console.log(`Data source: ${source}`)
      console.log("Raw data:", data)
      
      if (data) {
        try {
          const parsedData = JSON.parse(data)
          console.log("Dashboard data loaded from", source, ":", parsedData)
          
          // Validate the data structure
          if (parsedData && (parsedData.financeResult || parsedData.healthResult)) {
            setDashboardData(parsedData)
            calculateScores(parsedData)
          } else {
            console.error("Invalid dashboard data structure:", parsedData)
            router.push("/riskassessment")
          }
        } catch (error) {
          console.error("Error parsing dashboard data:", error)
          router.push("/riskassessment")
        }
      } else {
        console.warn("No dashboard data found in localStorage or sessionStorage")
        // Add a small delay to handle potential race conditions
        setTimeout(() => {
          const retryData = localStorage.getItem("dashboardData") || sessionStorage.getItem("dashboardData")
          if (!retryData) {
            console.error("Still no data after retry, redirecting...")
            router.push("/riskassessment")
          }
        }, 1000)
      }

      // Load previous scores if authenticated
      if (isAuthenticated()) {
        loadPreviousScores()
      }
    } else {
      // If not in browser, redirect
      console.log("Not in browser environment, redirecting...")
      router.push("/riskassessment")
    }
  }, [router])

  const loadPreviousScores = async () => {
    try {
      const token = getAuthToken()
      if (!token) return

      const response = await fetch('/api/risk-scores/get', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setPreviousScores(data.scores || [])
      }
    } catch (error) {
      console.error('Error loading previous scores:', error)
    }
  }

  const saveRiskScores = async () => {
    if (!scores || !isAuthenticated()) {
      setSaveError("Please log in to save your risk scores")
      return
    }

    setSaving(true)
    setSaveError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch('/api/risk-scores', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Tscore: scores.overallRiskScore,
          Financial: scores.financeScore,
          Health: scores.healthScore,
          TimeHori: scores.timeHorizonScore,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save risk scores')
      }

      const result = await response.json()
      console.log('Scores saved successfully:', result)
      
      setSaved(true)
      // Reload previous scores to show the new one
      await loadPreviousScores()
      
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving scores:', error)
      setSaveError(error instanceof Error ? error.message : 'Failed to save risk scores')
    } finally {
      setSaving(false)
    }
  }

  const calculateFinancialRiskScore = (financeForm: FinanceFormData) => {
    try {
      // Validate required fields
      if (!financeForm) {
        console.warn("No finance form data available")
        return 0.5
      }

      let riskScore = 0
      let totalWeight = 0

      console.log("Calculating financial risk with data:", {
        Credit_Score: financeForm.Credit_Score,
        Debt_to_Income_Ratio: financeForm.Debt_to_Income_Ratio,
        Payment_History: financeForm.Payment_History,
        Previous_Defaults: financeForm.Previous_Defaults,
        Employment_Status: financeForm.Employment_Status,
        Years_at_Current_Job: financeForm.Years_at_Current_Job,
        Income: financeForm.Income,
        Loan_Amount: financeForm.Loan_Amount
      })

      // Credit Score (25% weight) - Higher credit score = lower risk
      if (typeof financeForm.Credit_Score === 'number' && financeForm.Credit_Score > 0) {
        const creditWeight = 0.25
        let creditRisk = 0
        if (financeForm.Credit_Score >= 750) creditRisk = 0.1       // Excellent
        else if (financeForm.Credit_Score >= 700) creditRisk = 0.2  // Good
        else if (financeForm.Credit_Score >= 650) creditRisk = 0.4  // Fair
        else if (financeForm.Credit_Score >= 600) creditRisk = 0.6  // Poor
        else creditRisk = 0.8                                       // Very Poor
        
        riskScore += creditRisk * creditWeight
        totalWeight += creditWeight
        console.log(`Credit Score: ${financeForm.Credit_Score}, Risk: ${creditRisk}, Weight: ${creditWeight}`)
      }

      // Debt-to-Income Ratio (20% weight) - Higher DTI = higher risk
      if (typeof financeForm.Debt_to_Income_Ratio === 'number' && financeForm.Debt_to_Income_Ratio >= 0) {
        const dtiWeight = 0.2
        let dtiRisk = 0
        const dti = financeForm.Debt_to_Income_Ratio / 100 // Convert percentage to decimal if needed
        if (dti <= 0.2) dtiRisk = 0.1        // Very low risk
        else if (dti <= 0.36) dtiRisk = 0.3  // Low risk
        else if (dti <= 0.5) dtiRisk = 0.6   // Moderate risk
        else dtiRisk = 0.9                   // High risk
        
        riskScore += dtiRisk * dtiWeight
        totalWeight += dtiWeight
        console.log(`DTI Ratio: ${financeForm.Debt_to_Income_Ratio}, Risk: ${dtiRisk}, Weight: ${dtiWeight}`)
      }

      // Payment History (20% weight) - Poor history = higher risk
      if (financeForm.Payment_History && typeof financeForm.Payment_History === 'string') {
        const paymentWeight = 0.2
        let paymentRisk = 0
        const history = financeForm.Payment_History.toLowerCase()
        if (history.includes('excellent') || history.includes('perfect')) paymentRisk = 0.1
        else if (history.includes('good') || history.includes('very good')) paymentRisk = 0.2
        else if (history.includes('average') || history.includes('fair') || history.includes('satisfactory')) paymentRisk = 0.5
        else if (history.includes('poor') || history.includes('bad')) paymentRisk = 0.8
        else paymentRisk = 0.4 // Default for unknown
        
        riskScore += paymentRisk * paymentWeight
        totalWeight += paymentWeight
        console.log(`Payment History: ${financeForm.Payment_History}, Risk: ${paymentRisk}, Weight: ${paymentWeight}`)
      }

      // Previous Defaults (15% weight) - More defaults = higher risk
      if (typeof financeForm.Previous_Defaults === 'number' && financeForm.Previous_Defaults >= 0) {
        const defaultWeight = 0.15
        let defaultRisk = 0
        if (financeForm.Previous_Defaults === 0) defaultRisk = 0.1
        else if (financeForm.Previous_Defaults === 1) defaultRisk = 0.4
        else if (financeForm.Previous_Defaults === 2) defaultRisk = 0.7
        else defaultRisk = 0.9 // 3 or more defaults
        
        riskScore += defaultRisk * defaultWeight
        totalWeight += defaultWeight
        console.log(`Previous Defaults: ${financeForm.Previous_Defaults}, Risk: ${defaultRisk}, Weight: ${defaultWeight}`)
      }

      // Employment Status (10% weight) - Stable employment = lower risk
      if (financeForm.Employment_Status && typeof financeForm.Employment_Status === 'string') {
        const empWeight = 0.1
        let empRisk = 0
        const status = financeForm.Employment_Status.toLowerCase()
        if (status.includes('full-time') || status.includes('permanent') || status.includes('employed')) empRisk = 0.1
        else if (status.includes('part-time')) empRisk = 0.3
        else if (status.includes('contract') || status.includes('freelance') || status.includes('self-employed')) empRisk = 0.5
        else if (status.includes('unemployed') || status.includes('retired')) empRisk = 0.9
        else empRisk = 0.4 // Default for unknown
        
        riskScore += empRisk * empWeight
        totalWeight += empWeight
        console.log(`Employment Status: ${financeForm.Employment_Status}, Risk: ${empRisk}, Weight: ${empWeight}`)
      }

      // Years at Current Job (5% weight) - More stability = lower risk
      if (typeof financeForm.Years_at_Current_Job === 'number' && financeForm.Years_at_Current_Job >= 0) {
        const jobWeight = 0.05
        let jobRisk = 0
        if (financeForm.Years_at_Current_Job >= 5) jobRisk = 0.1
        else if (financeForm.Years_at_Current_Job >= 2) jobRisk = 0.3
        else if (financeForm.Years_at_Current_Job >= 1) jobRisk = 0.5
        else jobRisk = 0.8 // Less than 1 year
        
        riskScore += jobRisk * jobWeight
        totalWeight += jobWeight
        console.log(`Years at Job: ${financeForm.Years_at_Current_Job}, Risk: ${jobRisk}, Weight: ${jobWeight}`)
      }

      // Income vs Loan Amount Ratio (5% weight) - Higher ratio = higher risk
      if (typeof financeForm.Income === 'number' && typeof financeForm.Loan_Amount === 'number' && 
          financeForm.Income > 0 && financeForm.Loan_Amount > 0) {
        const loanWeight = 0.05
        const loanToIncomeRatio = financeForm.Loan_Amount / financeForm.Income
        let loanRisk = 0
        if (loanToIncomeRatio <= 2) loanRisk = 0.1
        else if (loanToIncomeRatio <= 4) loanRisk = 0.3
        else if (loanToIncomeRatio <= 6) loanRisk = 0.6
        else loanRisk = 0.9
        
        riskScore += loanRisk * loanWeight
        totalWeight += loanWeight
        console.log(`Loan-to-Income Ratio: ${loanToIncomeRatio}, Risk: ${loanRisk}, Weight: ${loanWeight}`)
      }

      // Assets Value bonus (negative risk) - More assets = lower risk
      if (typeof financeForm.Assets_Value === 'number' && financeForm.Assets_Value > 0 && 
          typeof financeForm.Income === 'number' && financeForm.Income > 0) {
        const assetsToIncomeRatio = financeForm.Assets_Value / financeForm.Income
        if (assetsToIncomeRatio > 1) {
          // Reduce risk by up to 10% based on assets
          const riskReduction = Math.min(0.1, assetsToIncomeRatio * 0.02)
          riskScore = Math.max(0, riskScore - riskReduction)
          console.log(`Assets bonus: ${riskReduction} risk reduction`)
        }
      }

      // Normalize the score based on available data
      if (totalWeight > 0) {
        riskScore = riskScore / totalWeight
      } else {
        console.warn("No valid financial data found for risk calculation")
        return 0.5 // Default medium risk when no data
      }

      // Ensure score is between 0 and 1
      const finalScore = Math.max(0, Math.min(1, riskScore))
      
      console.log("Financial Risk Calculation Summary:", {
        totalWeight,
        rawScore: riskScore,
        finalScore,
        riskPercentage: Math.round(finalScore * 100) + "%"
      })

      return finalScore
    } catch (error) {
      console.error("Error in financial risk calculation:", error)
      return 0.5 // Default medium risk on error
    }
  }

  const calculateFraminghamRisk = (healthForm: HealthFormData) => {
    try {
      // Validate required fields
      if (!healthForm || 
          typeof healthForm.age !== 'number' || 
          typeof healthForm.BMI !== 'number' || 
          typeof healthForm.sysBP !== 'number') {
        console.warn("Invalid health form data")
        return 0.1 // Default low risk for invalid data
      }

      console.log("Calculating Framingham risk with data:", {
        male: healthForm.male,
        age: healthForm.age,
        BMI: healthForm.BMI,
        sysBP: healthForm.sysBP,
        currentSmoker: healthForm.currentSmoker,
        diabetes: healthForm.diabetes,
        BPMeds: healthForm.BPMeds
      })

      // Framingham CVD Risk Model coefficients (simplified version)
      const coefficients = {
        male: {
          beta0: -29.799,
          betaLnAge: 4.884,
          betaLnBMI: 0.645,
          betaLnSBP_treated: 2.019,
          betaLnSBP_untreated: 1.957,
          betaSmoker: 0.549,
          betaDiabetes: 0.645,
          L_mean: 61.18,
          S0: 0.88431,
        },
        female: {
          beta0: -29.067,
          betaLnAge: 4.276,
          betaLnBMI: 0.302,
          betaLnSBP_treated: 2.469,
          betaLnSBP_untreated: 2.323,
          betaSmoker: 0.691,
          betaDiabetes: 0.874,
          L_mean: 26.1931,
          S0: 0.95012,
        },
      }

      const isMale = healthForm.male === 1
      const coeff = isMale ? coefficients.male : coefficients.female

      // Validate and clamp input values to reasonable ranges
      const age = Math.max(20, Math.min(100, healthForm.age))
      const BMI = Math.max(15, Math.min(50, healthForm.BMI))
      const sysBP = Math.max(80, Math.min(200, healthForm.sysBP))

      const lnAge = Math.log(age)
      const lnBMI = Math.log(BMI)
      const lnSBP = Math.log(sysBP)
      const betaLnSBP = healthForm.BPMeds === 1 ? coeff.betaLnSBP_treated : coeff.betaLnSBP_untreated

      const currentSmoker = healthForm.currentSmoker === 1 ? 1 : 0
      const diabetes = healthForm.diabetes === 1 ? 1 : 0

      const L =
        coeff.beta0 +
        coeff.betaLnAge * lnAge +
        coeff.betaLnBMI * lnBMI +
        betaLnSBP * lnSBP +
        coeff.betaSmoker * currentSmoker +
        coeff.betaDiabetes * diabetes

      const p10 = 1 - Math.pow(coeff.S0, Math.exp(L - coeff.L_mean))
      
      // Return a valid number, clamped between 0 and 1
      const result = Math.max(0, Math.min(1, p10))
      const finalResult = isNaN(result) || !isFinite(result) ? 0.1 : result
      
      console.log("Framingham Risk Calculation:", {
        gender: isMale ? 'Male' : 'Female',
        age, BMI, sysBP,
        L_value: L,
        p10_raw: p10,
        p10_final: finalResult,
        riskPercentage: Math.round(finalResult * 100) + "%"
      })
      
      return finalResult
    } catch (error) {
      console.error("Error in Framingham calculation:", error)
      return 0.1 // Default low risk on error
    }
  }

  const calculateScores = async (data: DashboardData) => {
    try {
      console.log("Starting score calculations with data:", data)
      
      let healthScore = 0
      let financeScore = 0
      let healthClassification = "No Data"
      let financeClassification = "No Data"

      // Calculate Health Score - PRIORITY: Use model results first
      if (data.healthResult?.probability !== undefined) {
        // Use the actual model prediction result
        const p10 = data.healthResult.probability
        console.log("Using health model result - probability:", p10)
        
        if (!isNaN(p10) && isFinite(p10)) {
          // Convert probability to score: higher probability = higher risk = lower score
          healthScore = Math.round(100 * (1 - p10))
          healthClassification = getHealthClassification(p10)
          console.log(`Health Score from model: ${healthScore} (${healthClassification})`)
        }
      } else if (data.healthForm) {
        // Fallback to form-based calculation only if no model result
        const p10 = calculateFraminghamRisk(data.healthForm)
        if (!isNaN(p10) && isFinite(p10)) {
          healthScore = Math.round(100 * (1 - p10))
          healthClassification = getHealthClassification(p10)
          console.log(`Health Score from form calculation: ${healthScore} (${healthClassification})`)
        }
      }

      // Calculate Finance Score - PRIORITY: Use model results first
      let FSI = 0.5 // Default medium risk
      
      if (data.financeResult?.["Risk Rating"]) {
        // Use the actual model prediction result
        const riskRating = data.financeResult["Risk Rating"].toLowerCase()
        console.log("Using finance model result - Risk Rating:", data.financeResult["Risk Rating"])
        
        if (riskRating === "low") FSI = 0.2
        else if (riskRating === "medium") FSI = 0.5
        else if (riskRating === "high") FSI = 0.8
        
        financeScore = Math.round(100 * (1 - FSI))
        financeClassification = getFinanceClassification(FSI)
        console.log(`Finance Score from model: ${financeScore} (${financeClassification})`)
        
      } else if (data.financeResult && typeof data.financeResult.FSI === 'number') {
        // Use FSI if available
        FSI = data.financeResult.FSI
        if (!isNaN(FSI) && isFinite(FSI)) {
          financeScore = Math.round(100 * (1 - FSI))
          financeClassification = getFinanceClassification(FSI)
          console.log(`Finance Score from FSI: ${financeScore} (${financeClassification})`)
        }
      } else if (data.financeForm) {
        // Fallback to form-based calculation only if no model result
        FSI = calculateFinancialRiskScore(data.financeForm)
        if (!isNaN(FSI) && isFinite(FSI)) {
          financeScore = Math.round(100 * (1 - FSI))
          financeClassification = getFinanceClassification(FSI)
          console.log(`Finance Score from form calculation: ${financeScore} (${financeClassification})`)
        }
      }

      // Calculate Time Horizon Score using actual risk probabilities
      const healthRiskProb = data.healthResult?.probability !== undefined ? 
        data.healthResult.probability : 
        (data.healthForm ? calculateFraminghamRisk(data.healthForm) : 0.1)
      
      const financeRiskProb = FSI
      
      // Ensure both values are valid numbers
      const validHealthRisk = isNaN(healthRiskProb) || !isFinite(healthRiskProb) ? 0.1 : healthRiskProb
      const validFinanceRisk = isNaN(financeRiskProb) || !isFinite(financeRiskProb) ? 0.5 : financeRiskProb
      
      const avgRiskProb = (validHealthRisk + validFinanceRisk) / 2
      const timeHorizonScore = Math.round(100 * (1 - avgRiskProb))
      const timeHorizonInterpretation = getTimeHorizonInterpretation(timeHorizonScore)

      // Calculate Overall Risk Score
      const validHealthScore = isNaN(healthScore) || !isFinite(healthScore) ? 0 : healthScore
      const validFinanceScore = isNaN(financeScore) || !isFinite(financeScore) ? 0 : financeScore
      const validTimeScore = isNaN(timeHorizonScore) || !isFinite(timeHorizonScore) ? 0 : timeHorizonScore
      
      const overallRiskScore = Math.round(0.4 * validHealthScore + 0.4 * validFinanceScore + 0.2 * validTimeScore)
      const overallRiskInterpretation = getOverallRiskInterpretation(overallRiskScore)

      const calculatedScores = {
        healthScore: validHealthScore,
        financeScore: validFinanceScore,
        timeHorizonScore: validTimeScore,
        overallRiskScore,
        healthClassification,
        financeClassification,
        timeHorizonInterpretation,
        overallRiskInterpretation,
      }

      console.log("Final calculated scores:", calculatedScores)
      console.log("Model results used:", {
        healthResult: data.healthResult,
        financeResult: data.financeResult
      })
      
      setScores(calculatedScores)

      // Generate AI Analysis
      await generateAIAnalysis(calculatedScores)
    } catch (error) {
      console.error("Error calculating scores:", error)
      // Set default scores in case of error
      setScores({
        healthScore: 0,
        financeScore: 0,
        timeHorizonScore: 0,
        overallRiskScore: 0,
        healthClassification: "Error",
        financeClassification: "Error",
        timeHorizonInterpretation: "Error",
        overallRiskInterpretation: "Error"
      })
    } finally {
      setLoading(false)
    }
  }

  const getHealthClassification = (p10: number) => {
    if (isNaN(p10) || !isFinite(p10)) return "No Data"
    if (p10 < 0.1) return "Low Risk"        // Less than 10% risk
    if (p10 < 0.2) return "Medium Risk"     // 10-20% risk  
    return "High Risk"                      // More than 20% risk
  }

  const getFinanceClassification = (fsi: number) => {
    if (isNaN(fsi) || !isFinite(fsi)) return "No Data"
    if (fsi < 0.3) return "Low Risk"        // FSI less than 0.3
    if (fsi < 0.7) return "Medium Risk"     // FSI 0.3 to 0.7
    return "High Risk"                      // FSI greater than 0.7
  }

  const getTimeHorizonInterpretation = (score: number) => {
    if (isNaN(score) || !isFinite(score)) return "No Data"
    if (score >= 70) return "Long-term safe zone"
    if (score >= 40) return "Moderate horizon"
    return "Short horizon"
  }

  const getOverallRiskInterpretation = (score: number) => {
    if (isNaN(score) || !isFinite(score)) return "No Data"
    if (score >= 80) return "Low Overall Risk (Safe)"
    if (score >= 50) return "Medium Overall Risk"
    return "High Overall Risk"
  }

  const generateAIAnalysis = async (scores: ScoreData) => {
    try {
      const analyses = await Promise.all([
        generateSingleAnalysis(
          `health score of ${scores.healthScore} (classification: ${scores.healthClassification})`,
        ),
        generateSingleAnalysis(
          `finance score of ${scores.financeScore} (classification: ${scores.financeClassification})`,
        ),
        generateSingleAnalysis(
          `time horizon score of ${scores.timeHorizonScore} (${scores.timeHorizonInterpretation})`,
        ),
        generateSingleAnalysis(
          `overall risk score of ${scores.overallRiskScore} (${scores.overallRiskInterpretation})`,
        ),
      ])

      setAiAnalysis({
        health: analyses[0],
        finance: analyses[1],
        timeHorizon: analyses[2],
        overall: analyses[3],
      })
    } catch (error) {
      console.error("Error generating AI analysis:", error)
      setAiAnalysis({
        health: "Analysis unavailable",
        finance: "Analysis unavailable", 
        timeHorizon: "Analysis unavailable",
        overall: "Analysis unavailable"
      })
    }
  }

  const generateSingleAnalysis = async (scoreDescription: string) => {
    try {
      const response = await fetch("/riskassessment/api/gemini-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Provide a short analysis (1-2 lines) of a ${scoreDescription}. Be concise and actionable.`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate analysis")
      }

      const data = await response.json()
      return data.analysis || "Analysis unavailable"
    } catch (error) {
      return "Analysis unavailable"
    }
  }

  const getScoreColor = (score: number) => {
    if (isNaN(score) || !isFinite(score)) return "text-gray-500"
    if (score >= 80) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (isNaN(score) || !isFinite(score)) return "bg-gray-500"
    if (score >= 80) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading || !scores) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Calculating your risk scores...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.push("/riskassessment")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Assessment
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Risk Dashboard
          </h1>
          <div className="flex items-center gap-2">
            {isAuthenticated() && (
              <Button
                variant="outline"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                History ({previousScores.length})
              </Button>
            )}
            {saved && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Saved!
              </div>
            )}
            <Button 
              onClick={saveRiskScores}
              disabled={saving || !isAuthenticated()}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Scores'}
            </Button>
          </div>
        </div>

        {/* Save Error Alert */}
        {saveError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {saveError}
            </AlertDescription>
          </Alert>
        )}

        {/* Authentication Warning */}
        {!isAuthenticated() && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              Please log in to save your risk assessment results to your profile.
            </AlertDescription>
          </Alert>
        )}

        {/* Previous Scores History */}
        {showHistory && isAuthenticated() && previousScores.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Previous Risk Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {previousScores.map((score, index) => (
                    <div key={score.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">#{previousScores.length - index}</span>
                        <span className="text-sm font-medium">{formatDate(score.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`font-medium ${getScoreColor(score.Health)}`}>
                          Health: {score.Health}
                        </span>
                        <span className={`font-medium ${getScoreColor(score.Financial)}`}>
                          Finance: {score.Financial}
                        </span>
                        <span className={`font-medium ${getScoreColor(score.TimeHori)}`}>
                          Time: {score.TimeHori}
                        </span>
                        <span className={`font-bold ${getScoreColor(score.Tscore)}`}>
                          Overall: {score.Tscore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Health Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  Health Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${getScoreColor(scores.healthScore)}`}>
                      {scores.healthScore}
                    </span>
                    <Badge variant="outline">{scores.healthClassification}</Badge>
                  </div>
                  <Progress value={scores.healthScore} className="h-2" />
                  {aiAnalysis?.health && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{aiAnalysis.health}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Finance Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Financial Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${getScoreColor(scores.financeScore)}`}>
                      {scores.financeScore}
                    </span>
                    <Badge variant="outline">{scores.financeClassification}</Badge>
                  </div>
                  <Progress value={scores.financeScore} className="h-2" />
                  {aiAnalysis?.finance && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{aiAnalysis.finance}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Time Horizon Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Time Horizon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${getScoreColor(scores.timeHorizonScore)}`}>
                      {scores.timeHorizonScore}
                    </span>
                    <Badge variant="outline">{scores.timeHorizonInterpretation}</Badge>
                  </div>
                  <Progress value={scores.timeHorizonScore} className="h-2" />
                  {aiAnalysis?.timeHorizon && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{aiAnalysis.timeHorizon}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Overall Risk Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="relative overflow-hidden border-2 border-primary">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-primary" />
                  Overall Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${getScoreColor(scores.overallRiskScore)}`}>
                      {scores.overallRiskScore}
                    </span>
                    <Badge variant="default">{scores.overallRiskInterpretation}</Badge>
                  </div>
                  <Progress value={scores.overallRiskScore} className="h-2" />
                  {aiAnalysis?.overall && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{aiAnalysis.overall}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Health Details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Health Risk Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Risk Assessment</span>
                    <span className={`text-sm font-bold ${getScoreColor(scores.healthScore)}`}>
                      {scores.healthScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Classification</span>
                    <Badge variant="outline">{scores.healthClassification}</Badge>
                  </div>
                  
                  {/* Show Model Results if available */}
                  {dashboardData?.healthResult && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Model Prediction:</strong></p>
                      <ul className="mt-1 space-y-1">
                        <li>• 10-Year CHD Risk: {dashboardData.healthResult.probability ? `${Math.round(dashboardData.healthResult.probability * 100)}%` : 'N/A'}</li>
                        {dashboardData.healthResult.TenYearCHD !== undefined && (
                          <li>• Prediction: {dashboardData.healthResult.TenYearCHD ? 'Risk Present' : 'No Risk'}</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {/* Show Form Data as secondary info */}
                  {dashboardData?.healthForm && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Based on Input Data:</strong></p>
                      <ul className="mt-1 space-y-1">
                        <li>• Age: {dashboardData.healthForm.age} years</li>
                        <li>• BMI: {dashboardData.healthForm.BMI}</li>
                        <li>• Blood Pressure: {dashboardData.healthForm.sysBP}/{dashboardData.healthForm.diaBP}</li>
                        <li>• Smoking: {dashboardData.healthForm.currentSmoker ? 'Yes' : 'No'}</li>
                        <li>• Diabetes: {dashboardData.healthForm.diabetes ? 'Yes' : 'No'}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Finance Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Financial Risk Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Risk Assessment</span>
                    <span className={`text-sm font-bold ${getScoreColor(scores.financeScore)}`}>
                      {scores.financeScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Classification</span>
                    <Badge variant="outline">{scores.financeClassification}</Badge>
                  </div>
                  
                  {/* Show Model Results if available */}
                  {dashboardData?.financeResult && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Model Prediction:</strong></p>
                      <ul className="mt-1 space-y-1">
                        <li>• Risk Rating: {dashboardData.financeResult["Risk Rating"] || 'N/A'}</li>
                        {dashboardData.financeResult.FSI !== undefined && (
                          <li>• Financial Stability Index: {dashboardData.financeResult.FSI.toFixed(3)}</li>
                        )}
                        {dashboardData.financeResult.Loan_Approval_Probability !== undefined && (
                          <li>• Approval Probability: {Math.round(dashboardData.financeResult.Loan_Approval_Probability * 100)}%</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {/* Show Form Data as secondary info */}
                  {dashboardData?.financeForm && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Based on Input Data:</strong></p>
                      <ul className="mt-1 space-y-1">
                        <li>• Credit Score: {dashboardData.financeForm.Credit_Score}</li>
                        <li>• DTI Ratio: {dashboardData.financeForm.Debt_to_Income_Ratio}%</li>
                        <li>• Employment: {dashboardData.financeForm.Employment_Status}</li>
                        <li>• Payment History: {dashboardData.financeForm.Payment_History}</li>
                        <li>• Previous Defaults: {dashboardData.financeForm.Previous_Defaults}</li>
                        <li>• Years at Job: {dashboardData.financeForm.Years_at_Current_Job}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Risk Factors Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Risk Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.healthScore)}`}>
                    {scores.healthScore}%
                  </div>
                  <p className="text-sm text-gray-600">Health Safety Score</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on cardiovascular risk factors
                  </p>
                </div>
                
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.financeScore)}`}>
                    {scores.financeScore}%
                  </div>
                  <p className="text-sm text-gray-600">Financial Stability Score</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on creditworthiness and income stability
                  </p>
                </div>
                
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.overallRiskScore)}`}>
                    {scores.overallRiskScore}%
                  </div>
                  <p className="text-sm text-gray-600">Overall Risk Score</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Combined health and financial assessment
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Understanding Your Scores:</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• <span className="text-green-600 font-medium">80-100:</span> Low risk - Excellent financial and health profile</p>
                  <p>• <span className="text-yellow-600 font-medium">50-79:</span> Medium risk - Some areas need attention</p>
                  <p>• <span className="text-red-600 font-medium">0-49:</span> High risk - Consider immediate improvements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Know More Button */}
        <div className="text-center">
          <Button
            onClick={() => router.push("/riskassessment/know-more")}
            variant="outline"
            size="lg"
            className="bg-white/50 backdrop-blur hover:bg-white/80 transition-all duration-300"
          >
            Know More About These Calculations
          </Button>
        </div>
      </div>
    </div>
  )
}
