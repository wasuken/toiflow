import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { DELETE } from './route';

// Prismaのモック
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn(() => ({
      questionList: {
        delete: jest.fn()
      }
    }))
  }
})

describe('DELETE API Route', () => {
  let prisma: PrismaClient

  beforeEach(() => {
    prisma = new PrismaClient()
    jest.clearAllMocks()
  })

  it('正常に削除できること', async () => {
    // モックの戻り値を設定
    const mockData = {
      id: 1,
      title: 'テストプリセット',
      questions: ['質問1', '質問2']
    }
    
    // @ts-ignore - モックのため
    prisma.questionList.delete.mockResolvedValue(mockData)

    const req = new Request('http://localhost:3000/api/preset/1', {
      method: 'DELETE'
    })

    const response = await DELETE(req, { params: { id: 1 } })
    const json = await response.json()

    // レスポンスの検証
    expect(response.status).toBe(200)
  })
})
