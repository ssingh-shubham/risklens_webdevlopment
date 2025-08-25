import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, ...assessmentData } = data

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Save to database
    const financeAssessment = await prisma.financeAssessment.create({
      data: {
        userId: userId,
        age: assessmentData.Age,
        gender: assessmentData.Gender,
        educationLevel: assessmentData.Education_Level,
        maritalStatus: assessmentData.Marital_Status,
        income: assessmentData.Income,
        creditScore: assessmentData.Credit_Score,
        loanAmount: assessmentData.Loan_Amount,
        loanPurpose: assessmentData.Loan_Purpose,
        employmentStatus: assessmentData.Employment_Status,
        yearsAtCurrentJob: assessmentData.Years_at_Current_Job,
        paymentHistory: assessmentData.Payment_History,
        debtToIncomeRatio: assessmentData.Debt_to_Income_Ratio,
        assetsValue: assessmentData.Assets_Value,
        numberOfDependents: assessmentData.Number_of_Dependents,
        previousDefaults: assessmentData.Previous_Defaults,
        maritalStatusChange: assessmentData.Marital_Status_Change,
        riskRating: assessmentData.riskRating || null
      }
    })

    return NextResponse.json({
      success: true,
      assessmentId: financeAssessment.id,
      message: 'Finance assessment saved successfully'
    })

  } catch (error: any) {
    console.error('Error saving finance assessment:', error)
    return NextResponse.json(
      { error: 'Failed to save finance assessment', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}