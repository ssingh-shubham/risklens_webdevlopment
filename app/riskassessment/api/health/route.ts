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
    const healthAssessment = await prisma.healthAssessment.create({
      data: {
        userId: userId,
        male: assessmentData.male,
        age: assessmentData.age,
        education: assessmentData.education,
        currentSmoker: assessmentData.currentSmoker,
        cigsPerDay: assessmentData.cigsPerDay,
        bpMeds: assessmentData.BPMeds,
        prevalentStroke: assessmentData.prevalentStroke,
        prevalentHyp: assessmentData.prevalentHyp,
        diabetes: assessmentData.diabetes,
        totChol: assessmentData.totChol,
        sysBP: assessmentData.sysBP,
        diaBP: assessmentData.diaBP,
        bmi: assessmentData.BMI,
        heartRate: assessmentData.heartRate,
        glucose: assessmentData.glucose,
        tenYearCHD: assessmentData.TenYearCHD ,
        probability: assessmentData.probability || null
      }
    })

    return NextResponse.json({
      success: true,
      assessmentId: healthAssessment.id,
      message: 'Health assessment saved successfully'
    })

  } catch (error: any) {
    console.error('Error saving health assessment:', error)
    return NextResponse.json(
      { error: 'Failed to save health assessment', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}